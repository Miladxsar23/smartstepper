import { ReactElement } from 'react';
import {
  Control,
  FieldValues,
  Resolver,
  UseFormGetValues,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
} from 'react-hook-form';

export interface ISmartStepperContextValue<T extends FieldValues> {
  navigateToNextStep(skipStep?: string, unregister?: boolean): Promise<void>;
  navigateToPreviousStep(): void;
  registerStepperFields: UseFormRegister<T>;
  getStepperFieldValues: UseFormGetValues<T>;
  setStepperFieldValues: UseFormSetValue<T>;
  stepperFieldResetter: UseFormReset<T>;
  canNavigateToNextStep(): Promise<boolean>;
  control: Control<T, T>;
}

export interface IStepProps {
  stepName: string;
  fieldsForValidation: string[];
  children: React.ReactNode;
}
export type TStepType = ReactElement<IStepProps>;
export interface IStepFormProps<T extends FieldValues = FieldValues> {
  onSubmit?: (data: T) => void;
  resolver: Resolver<T>;
  children: TStepType[] | TStepType;
  changeStepScrollMode?: 'page' | 'step';
  className?: string;
}
