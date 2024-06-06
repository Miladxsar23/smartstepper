import { UseControllerProps, useController } from 'react-hook-form';
import { useSmartStepper } from './useSmartStepper';
export const useSmartStepperController = (
  props: Omit<UseControllerProps, 'control'>
) => {
  const { control } = useSmartStepper();
  return useController({ control, ...props });
};
