import { useContext } from 'react';
import SmartStepperContext from '../components/smart-stepper-context';
export const useSmartStepper = () => {
  const stepContext = useContext(SmartStepperContext);
  return stepContext;
};
