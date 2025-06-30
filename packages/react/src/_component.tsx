import {
  cloneElement,
  isValidElement,
  useMemo,
  useState,
  type FormEvent,
} from 'react';
import {
  useForm,
  type Control,
  type FieldValues,
  type Path,
  type UseFormGetValues,
  type UseFormRegister,
  type UseFormReset,
  type UseFormSetValue,
} from 'react-hook-form';
import SmartStepperContext from './_context';
import { SmartStepperProps } from './_types';

const SmartStepper = <S extends string>({ config }: SmartStepperProps<S>) => {
  const [step, setStep] = useState<S>(config.start);
  const [historyStack, setHistoryStack] = useState<S[]>([]);

  const { control, trigger, getValues, setValue, register, unregister, reset } =
    useForm({
      resolver: async (data) => {
        const current = config.validations[step];
        const schema = current.schema;
        // Yup duck-typing
        if (
          schema &&
          typeof (schema as { validate?: unknown }).validate === 'function'
        ) {
          return (
            schema as {
              validate: (data: unknown, opts: unknown) => Promise<FieldValues>;
            }
          )
            .validate(data, { abortEarly: false })
            .then((values: FieldValues) => ({ values, errors: {} }))
            .catch((err: unknown) => {
              // Minimal Yup error type
              const yupErr = err as {
                inner: Array<{ path: string; message: string }>;
              };
              return {
                values: {},
                errors: (yupErr.inner || []).reduce(
                  (
                    acc: Record<string, { type: string; message: string }>,
                    e: { path: string; message: string }
                  ) => {
                    acc[e.path] = { type: 'manual', message: e.message };
                    return acc;
                  },
                  {}
                ),
              };
            });
        }
        // Zod duck-typing
        if (
          schema &&
          typeof (schema as { safeParse?: unknown }).safeParse === 'function'
        ) {
          const result = (
            schema as {
              safeParse: (data: unknown) => {
                success: boolean;
                data?: FieldValues;
                error?: {
                  errors: Array<{ path: (string | number)[]; message: string }>;
                };
              };
            }
          ).safeParse(data);
          if (result.success) {
            return { values: result.data as FieldValues, errors: {} };
          } else {
            const errors: Record<string, { type: string; message: string }> =
              {};
            (result.error?.errors || []).forEach(
              (e: { path: (string | number)[]; message: string }) => {
                if (e.path && e.path.length > 0) {
                  errors[e.path.join('.')] = {
                    type: 'manual',
                    message: e.message,
                  };
                }
              }
            );
            return { values: {}, errors };
          }
        }
        // fallback
        return { values: {}, errors: {} };
      },
      defaultValues: config.validations[step].defaultValues,
      mode: 'onBlur',
    });

  const currentStepSchemaFields = useMemo(() => {
    const schema = config.validations[step].schema;
    // Yup duck-typing
    if (schema && typeof (schema as { fields?: unknown }).fields === 'object') {
      return Object.keys(
        (schema as { fields: object }).fields ?? {}
      ) as Path<FieldValues>[];
    }
    // Zod duck-typing (object schemas)
    if (
      schema &&
      typeof (schema as { _def?: unknown })._def === 'object' &&
      (schema as unknown as { _def: { shape?: unknown } })._def.shape
    ) {
      const def = (schema as unknown as { _def: { shape: unknown } })._def;
      const shape =
        typeof def.shape === 'function'
          ? (def.shape as () => unknown)()
          : def.shape;
      return Object.keys((shape as object) ?? {}) as Path<FieldValues>[];
    }
    return [];
  }, [step, config.validations]);

  const handleNextStep = async () => {
    const isValid = await trigger(currentStepSchemaFields);
    if (!isValid) return;
    const next = config.orchestration[step]?.next?.(getValues());
    if (next) {
      setHistoryStack((prev) => [...prev, step]);
      setStep(next);
    }
  };

  const handlePreviousStep = () => {
    const prevStep = historyStack[historyStack.length - 1];
    if (prevStep) {
      unregister(currentStepSchemaFields);
      setStep(prevStep);
      setHistoryStack((prev) => prev.slice(0, -1));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const isValid = await trigger(currentStepSchemaFields);
    if (isValid) {
      config.onSubmit?.(getValues());
    }
  };

  const content = config.views[step]?.component;
  const wrapper = config.views[step]?.wrapper;
  const wrappedContent =
    wrapper && isValidElement(wrapper)
      ? cloneElement(wrapper, {}, content)
      : content;
  return (
    <SmartStepperContext.Provider
      value={{
        navigateToNextStep: handleNextStep,
        navigateToPreviousStep: handlePreviousStep,
        registerStepperFields: register as UseFormRegister<FieldValues>,
        getStepperFieldValues: getValues as UseFormGetValues<FieldValues>,
        setStepperFieldValues: setValue as UseFormSetValue<FieldValues>,
        stepperFieldResetter: reset as UseFormReset<FieldValues>,
        canNavigateToNextStep: async () => trigger(currentStepSchemaFields),
        control: control as Control<FieldValues>,
      }}
    >
      <form onSubmit={handleSubmit}>{wrappedContent}</form>
    </SmartStepperContext.Provider>
  );
};

export default SmartStepper;
