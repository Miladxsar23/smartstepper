import {
  SmartStepper,
  useController,
  useSmartStepper,
  type FieldValues,
  type SmartStepperConfig,
} from 'smartstepper';
import * as yup from 'yup';

// UserInfoStep.tsx
const UserInfoStep = ({ title }: { title: string }) => {
  const { navigateToNextStep, navigateToPreviousStep, control } =
    useSmartStepper();
  const {
    field: { name, onBlur, onChange, value },
  } = useController({ control, name: 'fullName' });
  const {
    field: {
      name: emailName,
      onBlur: emailOnBlur,
      onChange: emailOnChange,
      value: emailValue,
    },
  } = useController({ control, name: 'email' });
  return (
    <div>
      <h2>{title}</h2>
      <input
        name={name}
        placeholder="Full Name"
        value={value}
        onBlur={onBlur}
        onChange={onChange}
      />
      <input
        name={emailName}
        placeholder="Email"
        value={emailValue}
        onBlur={emailOnBlur}
        onChange={emailOnChange}
      />
      <button type="button" onClick={() => navigateToNextStep()}>
        Next
      </button>
      <button type="button" onClick={() => navigateToPreviousStep()}>
        Previous
      </button>
      <button type="submit">Submit</button>
    </div>
  );
};

// AddressStep.tsx
const AddressStep = ({ showLabel }: { showLabel: boolean }) => {
  const { navigateToNextStep, navigateToPreviousStep, control } =
    useSmartStepper();
  const {
    field: { name, onBlur, onChange, value },
  } = useController({ control, name: 'city' });
  const {
    field: {
      name: zipName,
      onBlur: zipOnBlur,
      onChange: zipOnChange,
      value: zipValue,
    },
  } = useController({ control, name: 'zip' });
  return (
    <div>
      {showLabel && <label htmlFor="city">City</label>}
      <input
        name={name}
        placeholder="City"
        value={value}
        onBlur={onBlur}
        onChange={onChange}
      />
      <input
        name={zipName}
        placeholder="ZIP Code"
        value={zipValue}
        onBlur={zipOnBlur}
        onChange={zipOnChange}
      />
      <button type="button" onClick={() => navigateToNextStep()}>
        Next
      </button>
      <button type="button" onClick={() => navigateToPreviousStep()}>
        Previous
      </button>
    </div>
  );
};

// ConfirmStep.tsx
const ConfirmStep = ({ note }: { note: string }) => (
  <div>
    <p>{note}</p>
    <button type="submit">Submit</button>
  </div>
);
// CardWrapper.tsx
const CardWrapper = ({
  children,
  borderColor,
}: {
  children?: React.ReactNode;
  borderColor: string;
}) => (
  <div
    style={{ border: `2px solid ${borderColor}`, padding: 16, borderRadius: 8 }}
  >
    {children}
  </div>
);

const MyMultiStepForm = () => {
  const config: SmartStepperConfig<'user' | 'address' | 'confirm'> = {
    start: 'user',
    orchesration: {
      user: { next: () => 'address' },
      address: {
        next: (data: FieldValues) => 'confirm',
        previous: (data: FieldValues) => 'user',
      },
      confirm: { previous: (data: FieldValues) => 'address' },
    },
    validations: {
      user: {
        schema: yup.object({
          fullName: yup.string().required('Full Name is required'),
          email: yup.string().email().required('Email is required'),
        }),
        defaultValues: { fullName: 'milad', email: 'milad@gmail.com' },
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
      user: {
        component: <UserInfoStep title="User Information" />,
        wrapper: <CardWrapper borderColor="blue" />,
      },
      address: {
        component: <AddressStep showLabel={true} />,
        wrapper: <CardWrapper borderColor="green" />,
      },
      confirm: {
        component: <ConfirmStep note="Please confirm your information." />,
        wrapper: <CardWrapper borderColor="orange" />,
      },
    },
    onSubmit: (data: FieldValues) => {
      console.log('Final submission', data);
      alert('Form submitted successfully!');
    },
  };

  return <SmartStepper config={config} />;
};

export default MyMultiStepForm;
