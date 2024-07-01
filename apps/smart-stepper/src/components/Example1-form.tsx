import { yupResolver } from '@hookform/resolvers/yup';
import { SmartStepper, TSmartStepperSchema } from '@smartstepper';
import * as Yup from 'yup';
import { InferType } from 'yup';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

// Define Yup schema for each step
const step1Schema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
});

const stepsSchema: TSmartStepperSchema<keyof InferType<typeof step1Schema>> = [
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
  const onSubmit = (data: InferType<typeof step1Schema>) => {
    console.log('Form submitted with data:', data);
    // You can submit the form data to your backend or do any necessary actions here
  };
  return (
    <SmartStepper
      onSubmit={onSubmit}
      resolver={yupResolver(step1Schema)}
      data-test="form-test"
      style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {stepsSchema.map((s, i) => (
        <SmartStepper.Step
          key={s.stepName}
          stepName={s.stepName}
          fieldsForValidation={s.fieldsForValidation}
        >
          <SmartStepper.Step
            stepName={`nestedstep-${s.stepName}`}
            fieldsForValidation={[]}
          >
            <SmartStepper.Step
              stepName={`nested-nestedstep-${s.stepName}`}
              fieldsForValidation={[]}
            >
              <h1>hello</h1>
              {s.component}
            </SmartStepper.Step>
          </SmartStepper.Step>
        </SmartStepper.Step>
      ))}
    </SmartStepper>
  );
};

export default ExampleForm;
