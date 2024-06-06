import { useSmartStepper } from '@smartstepper';

export default function Step3() {
  const { navigateToNextStep } = useSmartStepper();
  return (
    <button type="button" onClick={() => navigateToNextStep('step1')}>
      back to step1
    </button>
  );
}
