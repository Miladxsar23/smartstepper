**SmartStepper: A State Machine-Driven Multi-Step Form Component for React**

**Introduction**

`SmartStepper` is a powerful React component that simplifies the creation of multi-step forms with state management, validation, and a flexible UI approach. It utilizes a state machine concept to manage step transitions, ensuring a smooth and controlled user experience.

**Key Features**

- **State Machine for Step Management:**
  - Leverages a state machine to track the current step, enabling efficient navigation between steps.
  - Transitions are controlled and predictable, preventing unexpected behavior.
- **Nested Steps:**
  - Supports nested step structures, allowing for complex and multi-layered forms.
  - Provides clear hierarchy and organization for intricate form flows.
- **Separation of View and UI Customization:**
  - Encourages separation between step logic and UI rendering.
  - Step components define their content, while the stepper handles transitions and context.
  - Allows for custom UI components within each step for a tailored user experience.
- **Navigation with `useSmartStepper` Context:**
  - Provides a `useSmartStepper` hook for step components to access navigation methods:
    - `navigateToNextStep`: Moves the stepper to the next step in the sequence.
    - `navigateToPreviousStep`: Moves the stepper to the previous step in the history.
    - `navigateToPreviousStepWithTargetStep`: Navigates to a specific step within the history stack.
  - This context-based approach promotes clean communication between steps and the stepper.
- **Validation Integration with React Hook Form:**
  - Integrates seamlessly with `react-hook-form` for field-level validation within each step.
  - Utilizes Yup or other schema libraries for defining validation rules.
  - Triggers validation before advancing to the next step, ensuring data integrity.
- **Unregistering Fields on Step Backtracking:**
  - Automatically unregisters form fields when navigating to a previous step.
  - Prevents stale data from persisting and affecting validation in subsequent steps.
  - Maintains a clean form state and improves performance.

**Installation**

```bash
npm install smartstepper
```

**Basic Usage**

1. **Import necessary components:**

   ```javascript
   import { SmartStepper, TSmartStepperSchema } from 'smartstepper';
   import * as Yup from 'yup'; // Or your preferred schema library
   import Step1 from './Step1';
   import Step2 from './Step2';
   // ... import other step components
   ```

2. **Define your step schema:**

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

3. **Create your form component:**

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

**Advanced Features**

- **Customizing UI:** You can completely customize the UI of each step by creating your own step components that render the desired content. The stepper itself handles state management and navigation, allowing you to focus on building step-specific UI elements.
- **Nested Steps:** To create nested step structures, simply render `SmartStepper.Step` components within other step components. This enables you to organize complex forms with hierarchical relationships between steps.
- **Unregistering Fields:** `SmartStepper` automatically unregisters form fields when navigating to a previous step. This prevents issues with stale

## SmartStepper Context and React Hook Form Integration

The `SmartStepper` component utilizes React Context to provide methods and form state to child components (steps) for interaction with the stepper functionality. Here's a breakdown of the context values and their relation to React Hook Form integration:

**Context Values Exported by `useSmartStepper` Hook:**

1. **`navigateToNextStep` (function):**

   - Triggers navigation to the next step in the sequence.
   - This function doesn't directly interact with React Hook Form.

2. **`navigateToPreviousStep` (function):**

   - Triggers navigation to the previous step in the history stack.
   - It also doesn't directly interact with React Hook Form.

3. **`navigateToPreviousStepWithTargetStep` (function):**

   - Allows navigation to a specific target step within the history stack.
   - Similar to the previous two, it doesn't directly interact with React Hook Form.

4. **`registerStepperFields` (function):**

   - **React Hook Form integration:**
     - This function is a wrapper around `useForm().register` from React Hook Form.
     - It allows step components to register form fields for validation and state management within the context of the stepper form.
     - When called, it registers the fields and stores them in the stepper's internal state.

5. **`getStepperFieldValues` (function):**

   - **React Hook Form integration:**
     - This function is a wrapper around `useForm().getValues` from React Hook Form.
     - It enables step components to retrieve the current values of all registered form fields within the stepper.
     - This allows steps to access and potentially display or utilize the overall form data.

6. **`setStepperFieldValues` (function):**

   - **React Hook Form integration:**
     - This function is a wrapper around `useForm().setValue` from React Hook Form.
     - It provides a way for step components to update specific form field values within the stepper's state.
     - This allows steps to manipulate the form data if necessary for their functionality.

7. **`stepperFieldResetter` (function):**

   - **React Hook Form integration:**
     - This function is a wrapper around `useForm().reset` from React Hook Form.
     - It allows step components to reset the entire form state to its initial values.
     - This can be useful for clearing the form data when a step needs to start fresh.

8. **`canNavigateToNextStep` (function):**

   - **React Hook Form integration:**
     - This function triggers validation for the current step using the fields defined in `fieldsForValidation` for that step.
     - It utilizes React Hook Form's validation mechanisms.
     - It returns a Promise that resolves to `true` if validation passes or `false` if there are errors.

9. **`control` (object):**
   - **React Hook Form integration:**
     - This is the `control` object directly provided by `useForm` from React Hook Form.
     - It allows step components to leverage additional features of React Hook Form, such as form-level validation or custom form controls, within the step context.

**Important Notes:**

- All context values exported by `useSmartStepper` are directly related to React Hook Form integration within `SmartStepper`.
- The provided wrapper functions around React Hook Form methods streamline the usage of form state and validation within step components.
- You don't need to import React Hook Form separately when using `SmartStepper`.

By effectively utilizing these context values, step components can interact with the form state, trigger validation, navigate between steps, and manage field values seamlessly within the `SmartStepper` framework. The integration with React Hook Form simplifies form validation and management, allowing you to focus on building clean and well-structured multi-step forms.
