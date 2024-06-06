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
  const names: Readonly<string[]> = useMemo(
    () =>
      stepChildren.map((child) => {
        return child.props.stepName;
      }),
    [stepChildren]
  );
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

  const handlePreviousStep = ()  => {
    if (historyStack.length !== 0) {
      const prevStep = historyStack[historyStack.length - 1];
      unregisterFn(stepFieldsMemo as Path<T>[]);
      setStep(prevStep);
    }
    setHistoryStack((prevHistoryStack) => {
      return prevHistoryStack.slice(0, prevHistoryStack.length - 1);
    });
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
  return children;
};

const Controller = (props: Omit<ControllerProps, 'control'>) => {
  const { control } = useSmartStepper();
  return (
    <ReactHookFormController
      control={control}
      {...props}
    />
  );
};
export default Object.assign(SmartStepper, {
  Step: Step,
  Controller: Controller,
});
