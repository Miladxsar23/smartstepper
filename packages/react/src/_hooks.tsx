/**
 * React hooks for interacting with the SmartStepper context and React Hook Form controllers.
 *
 * These hooks provide convenient access to the SmartStepper context and integrate with react-hook-form's controller logic.
 * - `useSmartStepper`: Accesses the SmartStepper context value for navigation and form control.
 * - `useSmartStepperController`: Returns a react-hook-form controller bound to the SmartStepper's form control.
 * - `useController`: Re-exported from react-hook-form for advanced use cases.
 *
 * @module SmartStepperHooks
 */
import { useContext } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import SmartStepperContext from './_context';

/**
 * Custom hook to access the SmartStepper context.
 *
 * Provides navigation methods, form field registration, and control object for the stepper form.
 *
 * @returns {ISmartStepperContextValue<FieldValues>} The SmartStepper context value.
 * @see ISmartStepperContextValue
 */
export const useSmartStepper = () => {
  const stepContext = useContext(SmartStepperContext);
  return stepContext;
};

/**
 * Custom hook to create a react-hook-form controller bound to the SmartStepper's form control.
 *
 * This hook automatically injects the SmartStepper's control object, so you only need to provide the remaining controller props.
 *
 * @param {Omit<UseControllerProps, 'control'>} props - Controller props excluding the control object.
 * @returns {ReturnType<typeof useController>} The controller object for the field.
 * @see useController
 */
export const useSmartStepperController = (
  props: Omit<UseControllerProps, 'control'>
) => {
  const { control } = useSmartStepper();
  return useController({ control, ...props });
};

/**
 * Re-export of react-hook-form's useController for advanced use cases.
 *
 * @see useController
 */
export { useController };

