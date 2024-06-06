import { SmartStepper, useSmartStepper } from '@smartstepper';
export default function Step1() {
  const { navigateToNextStep, navigateToPreviousStep } = useSmartStepper();
  return (
    <>
      <SmartStepper.Controller
        name="firstName"
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <div style={{ display: 'flex', flexFlow: 'column nowrap' }}>
            <input
              placeholder="First name"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
            <br />
            <p style={{ color: 'red' }}>{fieldState.error?.message}</p>
          </div>
        )}
      />
      <SmartStepper.Controller
        name="lastName"
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <div style={{ display: 'flex', flexFlow: 'column nowrap' }}>
            <input
              placeholder="last name"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
            <br />
            <p style={{ color: 'red' }}>{fieldState.error?.message}</p>
          </div>
        )}
      />
      <button type="button" onClick={() => navigateToNextStep()}>
        next
      </button>
      <button type="button" onClick={() => navigateToPreviousStep()}>
        prev
      </button>
    </>
  );
}
