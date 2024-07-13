import {
  Children,
  FormEvent,
  ReactElement,
  isValidElement,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Control,
  ControllerProps,
  FieldValues,
  Path,
  Controller as ReactHookFormController,
  UseFormGetValues,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
  useForm,
} from 'react-hook-form';
import { useScroll, useSmartStepper } from '../hook';
import { IStepFormProps, IStepProps } from '../type';
import SmartStepperContext from './smart-stepper-context';

const SmartStepper = <T extends FieldValues = FieldValues>({
  onSubmit,
  children,
  resolver,
  changeStepScrollMode = 'step',
  ...rest
}: IStepFormProps<T>) => {
  const {
    trigger,
    getValues,
    setValue,
    register,
    unregister: unregisterFn,
    control,
    reset,
  } = useForm<T>({
    resolver,
    mode: 'onBlur',
  });
  // hooks
  const [step, setStep] = useState<number>(0);
  const [historyStack, setHistoryStack] = useState<number[]>([]);
  const {
    scrollRef: stepScrollRef,
    handleScrollOnElement,
    handleScrollToTopOfPage,
  } = useScroll<HTMLDivElement>();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (stepScrollRef && changeStepScrollMode === 'step') {
        handleScrollOnElement();
      } else {
        handleScrollToTopOfPage();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [
    step,
    handleScrollOnElement,
    stepScrollRef,
    handleScrollToTopOfPage,
    changeStepScrollMode,
  ]);
  // calculated data
  const stepChildren = useMemo(() => {
    const childrenArr = Children.toArray(children);
    if (childrenArr.some((c) => !isValidElement(c) || c.type !== Step)) {
      throw new Error('SmartStepper only accepts Step components as children.');
    }
    return Children.toArray(children) as ReactElement<IStepProps>[];
  }, [children]);
  const getStepNames = (
    children: ReactElement<IStepProps>[],
    stepNames: string[] = []
  ) => {
    if (children.length < 1) return [];
    children.forEach((child) => {
      if (!isValidElement(child)) {
        return;
      }

      if (child.type === Step) {
        stepNames.push(child.props.stepName);
        getStepNames(
          Children.toArray(child.props.children) as ReactElement<IStepProps>[],
          stepNames
        );
      }
    });
    return stepNames;
  };
  const names: Readonly<string[]> = useMemo(() => {
    return getStepNames(stepChildren);
  }, [stepChildren]);
  const stepFieldsMemo = useMemo(
    () => stepChildren[step]?.props.fieldsForValidation || [],
    [step, stepChildren]
  );

  // methods
  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    const isValid = await trigger(stepFieldsMemo as Path<T>[]); // Trigger validation for the current step
    if (isValid) {
      if (onSubmit) {
        onSubmit(getValues());
      }
    }
  };
  const handleNextStep = async (
    targetStepName?: (typeof names)[number],
    unregister?: boolean
  ) => {
    if (targetStepName) {
      if (unregister) {
        unregisterFn(stepFieldsMemo as Path<T>[]);
      }
      setStep(names.indexOf(targetStepName));
      setHistoryStack((prevHistory) => {
        if (prevHistory.some((h) => h === step)) {
          return prevHistory;
        } else {
          return [...prevHistory, step];
        }
      });
    } else {
      const isValid = await trigger(stepFieldsMemo as Path<T>[]); // Trigger validation for the current step
      if (isValid) {
        setHistoryStack((prevHistory) => {
          if (prevHistory.some((h) => h === step)) {
            return prevHistory;
          } else {
            return [...prevHistory, step];
          }
        });
        setStep((prev) => {
          if (prev === Children.count(children) - 1) return prev;
          return prev + 1;
        });
      }
    }
  };

  const handlePreviousStep = () => {
    if (historyStack.length !== 0) {
      const prevStep = historyStack[historyStack.length - 1];
      unregisterFn(stepFieldsMemo as Path<T>[]);
      setStep(prevStep);
    }
    setHistoryStack((prevHistoryStack) => {
      return prevHistoryStack.slice(0, prevHistoryStack.length - 1);
    });
  };
  const handlePreviousWithTargetStep = (targetStep: string) => {
    const targetStepIndex = names.indexOf(targetStep);
    if (targetStepIndex < 0)
      throw new Error('There is not step with the name of targetStep');
    if (step < targetStepIndex) {
      throw new Error('Target step should not be after the current step');
    } else {
      setStep(targetStepIndex);
      const targetStepInHistoryStackIndex =
        historyStack.indexOf(targetStepIndex);
      const stepsThatShouldBeUnregister = historyStack.filter(
        (s, i) => s !== targetStepIndex && i > targetStepInHistoryStackIndex
      );
      stepsThatShouldBeUnregister.forEach((s) => {
        const stepFields = stepChildren[s].props.fieldsForValidation || [];
        unregisterFn(stepFields as Path<T>[]);
      });
      unregisterFn(stepFieldsMemo as Path<T>[]);
      setHistoryStack(historyStack.slice(0, targetStepInHistoryStackIndex + 1));
    }
  };
  const isValidToNext = async () => {
    const isValid = await trigger(stepFieldsMemo as Path<T>[]);
    return isValid;
  };
  const renderStep = () => {
    const stepChild: ReactElement<IStepProps> = Children.toArray(children)[
      step
    ] as ReactElement<IStepProps>;
    return stepChild;
  };
  return (
    <SmartStepperContext.Provider
      value={{
        navigateToNextStep: handleNextStep,
        navigateToPreviousStep: handlePreviousStep,
        navigateToPreviousStepWithTargetStep: handlePreviousWithTargetStep,
        registerStepperFields: register as UseFormRegister<FieldValues>,
        getStepperFieldValues: getValues as UseFormGetValues<FieldValues>,
        setStepperFieldValues: setValue as UseFormSetValue<FieldValues>,
        stepperFieldResetter: reset as UseFormReset<FieldValues>,
        canNavigateToNextStep: isValidToNext,
        control: control as Control<FieldValues, FieldValues>,
      }}
    >
      <div ref={stepScrollRef}>
        {/* form */}
        <form onSubmit={handleSubmit} {...rest}>
          {renderStep()}
        </form>
      </div>
    </SmartStepperContext.Provider>
  );
};
const Step = ({ children }: IStepProps) => {
  return <>{children}</>;
};

const Controller = (props: Omit<ControllerProps, 'control'>) => {
  const { control } = useSmartStepper();
  return <ReactHookFormController control={control} {...props} />;
};
export default Object.assign(SmartStepper, {
  Step: Step,
  Controller: Controller,
});
