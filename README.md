# Smart Stepper

## Introduction

`smart-stepper` is a powerful React component integrated with `react-hook-form` that simplifies the creation of multi-step forms. It provides robust state management, validation, and a flexible UI approach, ensuring a smooth and controlled user experience.

## Key Features

### State Machine for Step Management

- Leverages a state machine to track the current step, enabling efficient navigation between steps.
- Ensures controlled and predictable transitions, preventing unexpected behavior.

### Nested Steps

- Supports nested step structures for complex and multi-layered forms.
- Provides clear hierarchy and organization for intricate form flows.

### Separation of View and UI Customization

- Encourages separation between step logic and UI rendering.
- Step components define their content, while the stepper handles transitions and context.
- Allows for custom UI components within each step for a tailored user experience.

### Navigation with `useSmartStepper` Context

- Provides a `useSmartStepper` hook for step components to access navigation methods:
  - `navigateToNextStep`: Moves to the next step in the sequence.
  - `navigateToPreviousStep`: Moves to the previous step in the history.
  - `navigateToPreviousStepWithTargetStep`: Navigates to a specific step within the history stack.
- Promotes clean communication between steps and the stepper.

### Validation Integration with React Hook Form

- Seamlessly integrates with `react-hook-form` for field-level validation within each step.
- Utilizes Yup or other schema libraries for defining validation rules.
- Triggers validation before advancing to the next step, ensuring data integrity.

### Unregistering Fields on Step Backtracking

- Automatically unregisters form fields when navigating to a previous step.
- Prevents stale data from persisting and affecting validation in subsequent steps.
- Maintains a clean form state and improves performance.

## Installation

```bash
npm install smartstepper
```

## Basic Usage

### Import Necessary Components

```javascript
import { SmartStepper, TSmartStepperSchema } from 'smartstepper';
import * as Yup from 'yup'; // Or your preferred schema library
import Step1 from './Step1';
import Step2 from './Step2';
// ... import other step components
```

### Define Your Step Schema

```javascript
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
    // ... define other steps
];
```

### Create Your Form Component

```javascript
const MyForm = () => {
  const onSubmit = (data) => {
    // Handle form submission with validated data
    console.log('Form submitted:', data);
  };

  return (
    <SmartStepper
      onSubmit={onSubmit}
      resolver={yupResolver(validationSchema)} // Or your validation resolver
      // ... other SmartStepper props
    >
      {stepsSchema.map((step) => (
        <SmartStepper.Step key={step.stepName} stepName={step.stepName} fieldsForValidation={step.fieldsForValidation}>
          {step.component}
        </SmartStepper.Step>
      ))}
    </SmartStepper>
  );
};

export default MyForm;
```

## Advanced Features

### Customizing UI

You can completely customize the UI of each step by creating your own step components that render the desired content. The stepper itself handles state management and navigation, allowing you to focus on building step-specific UI elements.

### Nested Steps

To create nested step structures, simply render `SmartStepper.Step` components within other step components. This enables you to organize complex forms with hierarchical relationships between steps.

### Unregistering Fields

`smart-stepper` automatically unregisters form fields when navigating to a previous step. This prevents issues with stale data.

## smart-stepper Context and React Hook Form Integration

The `smart-stepper` component utilizes React Context to provide methods and form state to child components (steps) for interaction with the stepper functionality. Here's a breakdown of the context values and their relation to React Hook Form integration:

| **Function**                           | **Description**                                                                                                                                 |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `navigateToNextStep`                   | Triggers navigation to the next step in the sequence.                                                                                           |
| `navigateToPreviousStep`               | Triggers navigation to the previous step in the history stack.                                                                                  |
| `navigateToPreviousStepWithTargetStep` | Allows navigation to a specific target step within the history stack.                                                                           |
| `registerStepperFields`                | **React Hook Form integration:** A wrapper around `useForm().register` for registering form fields for validation.                              |
| `getStepperFieldValues`                | **React Hook Form integration:** A wrapper around `useForm().getValues` for retrieving current values of form fields.                           |
| `setStepperFieldValues`                | **React Hook Form integration:** A wrapper around `useForm().setValue` for updating specific form field values.                                 |
| `stepperFieldResetter`                 | **React Hook Form integration:** A wrapper around `useForm().reset` for resetting the entire form state.                                        |
| `canNavigateToNextStep`                | **React Hook Form integration:** Triggers validation for the current step's fields, returns a Promise resolving to `true` if validation passes. |
| `control`                              | **React Hook Form integration:** The `control` object provided by `useForm`, allowing additional features within steps.                         |

By effectively utilizing these context values, step components can interact with the form state, trigger validation, navigate between steps, and manage field values seamlessly within the `smart-stepper` framework.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
