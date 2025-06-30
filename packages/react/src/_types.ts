import type { HTMLAttributes, ReactElement } from 'react';
import type {
    Control, FieldValues, Resolver, UseControllerProps, UseFormGetValues,
    UseFormRegister,
    UseFormReset,
    UseFormSetValue
} from 'react-hook-form';
import type { AnyObjectSchema } from 'yup';
import type { ZodSchema } from 'zod';

/**
 * Configuration object for the SmartStepper component.
 * @template S - Step name type (string literal union)
 */
export interface SmartStepperConfig<S extends string> {
  /**
   * Logic for determining navigation between steps.
   * Each step can define its own next/previous navigation logic.
   */
  orchestration: {
    [s in S]: {
      /**
       * Function to determine the next step based on form data.
       * @param data - The current form values.
       * @returns The name of the next step.
       */
      next?: (data: FieldValues) => S | S;
      /**
       * Function to determine the previous step based on form data.
       * @param data - The current form values.
       * @returns The name of the previous step.
       */
      previous?: (data: FieldValues) => S | S;
    };
  };

  /**
   * The initial step name.
   */
  start: S;

  /**
   * Validation schema and default values for each step.
   */
  validations: {
    [s in S]: {
      /**
       * Yup validation schema for the step.
       */
      schema: AnyObjectSchema | ZodSchema;
      /**
       * Optional default values for the step fields.
       */
      defaultValues?: FieldValues;
    };
  };

  /**
   * View configuration for each step, including the component and optional wrapper.
   */
  views: {
    [s in S]: {
      /**
       * The React component to render for this step.
       */
      component: ReactElement;
      /**
       * Optional wrapper React element for the step.
       */
      wrapper?: ReactElement;
    };
  };
  /**
   * Optional callback invoked on final submit.
   * @param data - The final form data.
   */
  onSubmit?: (data: FieldValues) => void;
}

/**
 * Props for the SmartStepper component.
 * @template S - Step name type
 */
export interface SmartStepperProps<S extends string> {
  /**
   * The configuration object for the stepper.
   */
  config: SmartStepperConfig<S>;
}

/**
 * Context value provided by the SmartStepper context.
 * @template T - Field values type
 */
export interface ISmartStepperContextValue<T extends FieldValues> {
  /**
   * Navigate to the next step, optionally specifying a target step and whether to unregister fields.
   * @param targetStepName - Optional name of the step to navigate to.
   * @param unregister - Whether to unregister fields from the previous step.
   */
  navigateToNextStep(
    targetStepName?: string,
    unregister?: boolean
  ): Promise<void>;
  /**
   * Navigate to the previous step.
   */
  navigateToPreviousStep(): void;
  /**
   * Register fields for the stepper form.
   */
  registerStepperFields: UseFormRegister<T>;
  /**
   * Get current values of the stepper fields.
   */
  getStepperFieldValues: UseFormGetValues<T>;
  /**
   * Set values for the stepper fields.
   */
  setStepperFieldValues: UseFormSetValue<T>;
  /**
   * Reset the stepper fields.
   */
  stepperFieldResetter: UseFormReset<T>;
  /**
   * Check if navigation to the next step is allowed (e.g., validation passes).
   */
  canNavigateToNextStep(): Promise<boolean>;
  /**
   * React Hook Form control object for the stepper.
   */
  control: Control<T, T>;
}

/**
 * Props for a single step in the stepper.
 */
export interface IStepProps {
  /**
   * The name of the step.
   */
  stepName: string;
  /**
   * The fields to validate for this step.
   */
  fieldsForValidation: string[];
  /**
   * The content of the step.
   */
  children: React.ReactNode;
}

/**
 * Type for a step React element.
 */
export type TStepType = ReactElement<IStepProps>;

/**
 * Props for a step form, used internally by the stepper.
 * @template T - Field values type
 */
export interface IStepFormProps<T extends FieldValues = FieldValues>
  extends Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  /**
   * Callback for form submission.
   * @param data - The form data for the step.
   */
  onSubmit?: (data: T) => void;
  /**
   * Resolver for validation (e.g., from react-hook-form).
   */
  resolver: Resolver<T>;
  /**
   * The step(s) to render as children.
   */
  children: TStepType | TStepType[];
  /**
   * Scroll mode when changing steps.
   */
  changeStepScrollMode?: 'page' | 'step';
  /**
   * Optional class name for the form.
   */
  className?: string;
}

/**
 * Internal schema for a single step in the stepper.
 * @template K - Field name type
 */
interface ISmartStepperSchema<K> {
  /**
   * The name of the step.
   */
  stepName: string;
  /**
   * The fields to validate for this step.
   */
  fieldsForValidation: K[];
  /**
   * The React component for this step.
   */
  component: ReactElement;
}

/**
 * Array of step schemas for the stepper.
 * @template K - Field name type
 */
export type TSmartStepperSchema<K> = ISmartStepperSchema<K>[];

// Re-export react-hook-form types
export { FieldValues, UseControllerProps };

