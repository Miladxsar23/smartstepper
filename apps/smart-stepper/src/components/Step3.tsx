import { useSmartStepper } from '@smartstepper';

export default function Step3() {
  const { navigateToPreviousStepWithTargetStep } = useSmartStepper();
  return (
    <button
      type="button"
      onClick={() => navigateToPreviousStepWithTargetStep('step1')}
    >
      back to step1
    </button>
  );
}
