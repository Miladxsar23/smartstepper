## SmartStepper - React Multi-Step Form Component

**SmartStepper** is a React component that simplifies building multi-step forms with validation and navigation. It provides a clean and intuitive way to guide users through a series of steps, ensuring they complete required fields before proceeding.

**Features:**

- **Step-by-step navigation:** Users progress through clearly defined steps, enhancing the form completion experience.
- **Validation:** Enforce data integrity with Yup schema integration and clear error messages.
- **Customizable steps:** Define the content and validation logic for each step independently.
- **Navigation control:** Control step navigation using next and previous buttons, providing flexibility in the flow.
- **Styling freedom:** Style your form and steps to match your application's design.

**Installation:**

```bash
npm install @smartstepper
```

**Usage:**

```jsx
import { yupResolver } from '@hookform/resolvers/yup';
import { SmartStepper, TSmartStepperSchema, useSmartStepper } from '@smartstepper';
import * as Yup from 'yup';
import { InferType } from 'yup';
// Define Yup schema for each step
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
});

const stepsSchema: TSmartStepperSchema<keyof InferType<typeof validationSchema>> = [
  {
    stepName: 'step1',
    fieldsForValidation: ['firstName', 'lastName'],
    component: <Step1 />,
  },
  {
    stepName: 'step2',
    fieldsForValidation: [],
    component: <Step2 />,
  },
  {
    stepName: 'step3',
    fieldsForValidation: [],
    component: <Step3 />,
  },
];

const ExampleForm = () => {
  const onSubmit = (data: InferType<typeof validationSchema>) => {
    console.log('Form submitted with data:', data);
    // You can submit the form data to your backend or do any necessary actions here
  };
  return (
    <SmartStepper
      onSubmit={onSubmit}
      resolver={yupResolver(validationSchema)}
      data-test="form-test"
      style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {stepsSchema.map((s) => (
        <SmartStepper.Step
          key={s.stepName}
          stepName={s.stepName}
          fieldsForValidation={s.fieldsForValidation}
        >
          {s.component}
        </SmartStepper.Step>
      ))}
    </SmartStepper>
  );
};

// Step1:
function Step1() {
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

// Step2:
function Step2() {
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

// Step3:
function Step3() {
  const { navigateToNextStep } = useSmartStepper();
  return (
    <button type="button" onClick={() => navigateToNextStep('step1')}>
      back to step1
    </button>
  );
}

```

In this example:

- We define a `validationSchema` using Yup for validation.
- We create an array of `steps` objects, each containing step name, validation fields, and component content.
- The `Controller` component from `@smartstepper` is used to render form fields within each step.
- The `onSubmit` function handles form submission logic.

**Contributing:**

We welcome contributions to improve SmartStepper. Feel free to submit pull requests for bug fixes, new features, or documentation enhancements.

**License:**

This project is licensed under the MIT License. See the LICENSE file for details.
