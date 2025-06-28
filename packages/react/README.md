# SmartStepper

[![npm version](https://img.shields.io/npm/v/smartstepper.svg)](https://www.npmjs.com/package/smartstepper)
[![npm downloads](https://img.shields.io/npm/dm/smartstepper.svg)](https://www.npmjs.com/package/smartstepper)
[![GitHub stars](https://img.shields.io/github/stars/Miladxsar23/smartstepper.svg?style=social)](https://github.com/Miladxsar23/smartstepper)
[![MIT License](https://img.shields.io/npm/l/smartstepper.svg)](https://opensource.org/licenses/MIT)

> **SmartStepper** is a modern, customizable React stepper component for building multi-step forms, wizards, and onboarding flows. Integrates seamlessly with [react-hook-form](https://react-hook-form.com/), supports Yup/Zod validation, and offers a flexible, config-driven API. Perfect for dynamic forms, onboarding, checkout flows, and more.

---

<!--
Add a GIF or screenshot here to showcase the component in action!
Example:
![SmartStepper Demo](./demo.gif)
-->

## Introduction

`smartstepper` is a powerful React component integrated with `react-hook-form` that simplifies the creation of multi-step forms. It provides robust state management, validation, and a flexible UI approach, ensuring a smooth and controlled user experience.

## Key Features

### State Machine for Step Management
- Leverages a state machine to track the current step, enabling efficient navigation between steps.
- Ensures controlled and predictable transitions, preventing unexpected behavior.

### Config-Driven Stepper
- All step logic, navigation, validation, and views are defined in a single `config` object.
- No need to define steps as children or schema arrays.
- **Navigation functions (`next` and `previous`) receive the current form values as their argument and should return the name of the next or previous step.**

#### Example of `orchesration` with arguments:
```js
orchesration: {
  user: { 
    next: (data) => data.fullName ? 'address' : 'user' 
  },
  address: {
    next: () => 'confirm',
    previous: (data) => data.fullName ? 'user' : 'address',
  },
  confirm: { previous: () => 'address' },
}
```
- **Arguments:**  
  - `next(data: FieldValues): StepName`  
  - `previous(data: FieldValues): StepName`  
  - `data` is the current form values object.

### Separation of View and UI Customization
- Encourages separation between step logic and UI rendering.
- Step components define their content, while the stepper handles transitions and context.
- Allows for custom UI components within each step for a tailored user experience.

### Navigation with `useSmartStepper` Context
- Provides a `useSmartStepper` hook for step components to access navigation methods and form control:
  - `navigateToNextStep`: Moves to the next step in the sequence. Optionally accepts a target step name and unregister flag.
  - `navigateToPreviousStep`: Moves to the previous step in the history.
  - `registerStepperFields`, `getStepperFieldValues`, `setStepperFieldValues`, `stepperFieldResetter`, `canNavigateToNextStep`, `control` for React Hook Form integration.

### Validation Integration with React Hook Form
- Seamlessly integrates with `react-hook-form` for field-level validation within each step.
- Utilizes Yup or Zod for defining validation rules.
- Triggers validation before advancing to the next step, ensuring data integrity.

### Unregistering Fields on Step Backtracking
- Automatically unregisters form fields when navigating to a previous step.
- Prevents stale data from persisting and affecting validation in subsequent steps.
- Maintains a clean form state and improves performance.

## Installation

```bash
npm install smartstepper
```

> **Note:** You must also install the following peer dependencies in your project:
>
> - `react`
> - `react-hook-form`
> - `yup` (for Yup validation) and/or `zod` (for Zod validation)

## Basic Usage

### 1. Import Necessary Components

```javascript
import {
  SmartStepper,
  useSmartStepper,
  Controller,
  type FieldValues,
  type SmartStepperConfig,
} from 'smartstepper';
import * as yup from 'yup';
```

### 2. Define Step Components

Each step is a React component that uses the `useSmartStepper` hook and the `Controller` component:

```javascript
const UserInfoStep = () => {
  const { navigateToNextStep, control } = useSmartStepper();
  return (
    <div>
      <Controller
        control={control}
        name="fullName"
        render={({ field }) => (
          <input {...field} />
        )}
      />
      <button type="button" onClick={() => navigateToNextStep()}>Next</button>
    </div>
  );
};
```

### 3. Create the Stepper Config

```javascript
const config: SmartStepperConfig<'user' | 'address' | 'confirm'> = {
  start: 'user',
  orchesration: {
    user: { 
      next: (data) => data.fullName ? 'address' : 'user' 
    },
    address: {
      next: () => 'confirm',
      previous: (data) => data.fullName ? 'user' : 'address',
    },
    confirm: { previous: () => 'address' },
  },
  validations: {
    user: {
      schema: yup.object({
        fullName: yup.string().required('Full Name is required'),
        email: yup.string().email().required('Email is required'),
      }),
      defaultValues: { fullName: '', email: '' },
    },
    address: {
      schema: yup.object({
        city: yup.string().required(),
        zip: yup.string().required(),
      }),
      defaultValues: { city: '', zip: '' },
    },
    confirm: {
      schema: yup.object(),
      defaultValues: {},
    },
  },
  views: {
    user: { component: <UserInfoStep /> },
    address: { component: <AddressStep /> },
    confirm: { component: <ConfirmStep /> },
  },
  onSubmit: (data: FieldValues) => {
    console.log('Final submission', data);
    alert('Form submitted successfully!');
  },
};
```

### 4. Use the SmartStepper Component

```javascript
const MyMultiStepForm = () => <SmartStepper config={config} />;
export default MyMultiStepForm;
```

## Advanced Features

### Customizing UI
You can completely customize the UI of each step by creating your own step components that render the desired content. The stepper itself handles state management and navigation, allowing you to focus on building step-specific UI elements.

### Step Wrappers
You can provide a `wrapper` React element for each step in the `views` config to wrap the step content (e.g., for cards or styling).

### Unregistering Fields
`smartstepper` automatically unregisters form fields when navigating to a previous step. This prevents issues with stale data.

## SmartStepper Context and React Hook Form Integration

The `SmartStepper` component utilizes React Context to provide methods and form state to step components for interaction with the stepper functionality. Here are the main context values and hooks:

| **Function/Hook**                | **Description**                                                                                                   |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `navigateToNextStep`             | Triggers navigation to the next step in the sequence. Optionally accepts a target step name and unregister flag.   |
| `navigateToPreviousStep`         | Triggers navigation to the previous step in the history stack.                                                    |
| `registerStepperFields`          | **React Hook Form integration:** A wrapper around `useForm().register` for registering form fields.               |
| `getStepperFieldValues`          | **React Hook Form integration:** A wrapper around `useForm().getValues` for retrieving current field values.      |
| `setStepperFieldValues`          | **React Hook Form integration:** A wrapper around `useForm().setValue` for updating specific field values.        |
| `stepperFieldResetter`           | **React Hook Form integration:** A wrapper around `useForm().reset` for resetting the entire form state.          |
| `canNavigateToNextStep`          | **React Hook Form integration:** Triggers validation for the current step's fields, returns a Promise of validity.|
| `control`                        | **React Hook Form integration:** The `control` object provided by `useForm`, for use with `Controller` or `useController`.        |
| `useSmartStepper`                | Custom hook to access the SmartStepper context in your step components.                                           |
| `useSmartStepperController`      | Custom hook to create a react-hook-form controller bound to the SmartStepper's form control.                      |

By effectively utilizing these context values and hooks, step components can interact with the form state, trigger validation, navigate between steps, and manage field values seamlessly within the `smartstepper` framework.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

