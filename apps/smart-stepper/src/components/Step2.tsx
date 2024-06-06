import { useSmartStepper } from '@smartstepper';

export default function Step1() {
  const { navigateToNextStep, navigateToPreviousStep } = useSmartStepper();
  return (
    <>
      <input type="email" name="email" placeholder="Email" />
      <button type="button" onClick={() => navigateToNextStep()}>
        next
      </button>
      <button type="button" onClick={() => navigateToPreviousStep()}>
        prev
      </button>
    </>
  );
}
