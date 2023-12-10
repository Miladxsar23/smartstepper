import {
  Children,
  FormEvent,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Control,
  FieldValues,
  Path,
  UseFormGetValues,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
  useForm,
} from 'react-hook-form';
import { useScroll } from '../hook';
import { IStepFormProps, IStepProps } from '../type';
import SmartStepperContext from './smart-stepper-context';

const SmartStepper = <T extends FieldValues = FieldValues>({
  onSubmit,
  children,
  resolver,
  className,
  changeStepScrollMode = 'step',
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
  const {
    scrollRef: stepScrollRef,
    handleScrollOnElement,
    handleScrollToTopOfPage,
  } = useScroll<HTMLDivElement>();
  const [historyStack, setHistoryStack] = useState<number[]>([]);
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
  const stepChildren = useMemo(
    () => Children.toArray(children) as ReactElement<IStepProps>[],
    [children]
  );
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
  const handleCheckKeyDown = (evt: React.KeyboardEvent<HTMLFormElement>) => {
    if (evt.key === 'Enter') evt.preventDefault();
  };
  const handleNextStep = async (
    skipStep?: (typeof names)[number],
    unregister?: boolean
  ) => {
    if (skipStep) {
      if (unregister) {
        unregisterFn(stepFieldsMemo as Path<T>[]);
      }
      setStep(names.indexOf(skipStep));
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
        {/* forms */}
        <form
          onSubmit={handleSubmit}
          onKeyDown={handleCheckKeyDown}
          className={className && className}
        >
          {renderStep()}
        </form>
      </div>
    </SmartStepperContext.Provider>
  );
};
const Step = ({ children }: IStepProps) => {
  return children;
};

export default Object.assign(SmartStepper, { Step: Step });
