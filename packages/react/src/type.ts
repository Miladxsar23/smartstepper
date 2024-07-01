import { HTMLAttributes, ReactElement } from 'react';
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
  navigateToNextStep(
    targetStepName?: string,
    unregister?: boolean
  ): Promise<void>;
  navigateToPreviousStep(): void;
  navigateToPreviousStepWithTargetStep(targetStepName: string): void;
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
export interface IStepFormProps<T extends FieldValues = FieldValues>
  extends Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  onSubmit?: (data: T) => void;
  resolver: Resolver<T>;
  children: TStepType | TStepType[];
  changeStepScrollMode?: 'page' | 'step';
  className?: string;
}

interface ISmartStepperSchema<K> {
  stepName: string;
  fieldsForValidation: K[];
  component: ReactElement;
}

export type TSmartStepperSchema<K> = ISmartStepperSchema<K>[];
