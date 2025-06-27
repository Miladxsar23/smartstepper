/**
 * @file _context.tsx
 * @description Provides the React context for the Smart Stepper component, enabling state and methods sharing across the stepper's component tree.
 *
 * Exports:
 * - SmartStepperContext: The React context for Smart Stepper, typed with ISmartStepperContextValue and FieldValues from react-hook-form.
 * - default: SmartStepperContext
 */
import { createContext } from 'react';
import { FieldValues } from 'react-hook-form';
import { ISmartStepperContextValue } from './_types';
export const SmartStepperContext = createContext<
  ISmartStepperContextValue<FieldValues>
>({} as ISmartStepperContextValue<FieldValues>);
export default SmartStepperContext;
