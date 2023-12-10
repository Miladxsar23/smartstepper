import { createContext } from 'react';
import { FieldValues } from 'react-hook-form';
import { ISmartStepperContextValue } from '../type';
export const SmartStepperContext = createContext<
  ISmartStepperContextValue<FieldValues>
>({} as ISmartStepperContextValue<FieldValues>);
export default SmartStepperContext;
