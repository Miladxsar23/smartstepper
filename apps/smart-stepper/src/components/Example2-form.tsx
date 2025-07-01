import {
  Controller,
  SmartStepper,
  useSmartStepper,
  type FieldValues,
  type SmartStepperConfig,
} from "smartstepper";
import * as yup from "yup";

// 🧱 Step 1: User Info
const UserInfoStep = ({ title }: { title: string }) => {
  const { control, navigateToNextStep } = useSmartStepper();

  return (
    <div>
      <h2>{title}</h2>
      <Controller
        name="fullName"
        control={control}
        render={({ field, fieldState }) => (
          <div>
            <input {...field} placeholder="Full Name" />
            {fieldState.error && (
              <p style={{ color: "red" }}>{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <div>
            <input {...field} placeholder="Email" />
            {fieldState.error && (
              <p style={{ color: "red" }}>{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      <Controller
        name="carType"
        control={control}
        render={({ field, fieldState }) => (
          <div>
            <select {...field}>
              <option value="">Select Car Type</option>
              <option value="internal">Internal</option>
              <option value="imported">Imported</option>
            </select>
            {fieldState.error && (
              <p style={{ color: "red" }}>{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      <button type="button" onClick={() => navigateToNextStep()}>
        Next
      </button>
    </div>
  );
};

// 🧱 Step 2: Address
const AddressStep = () => {
  const { control, navigateToNextStep, navigateToPreviousStep } =
    useSmartStepper();

  return (
    <div>
      <h2>Address Information</h2>

      <Controller
        name="city"
        control={control}
        render={({ field, fieldState }) => (
          <div>
            <input {...field} placeholder="City" />
            {fieldState.error && (
              <p style={{ color: "red" }}>{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      <Controller
        name="zip"
        control={control}
        render={({ field, fieldState }) => (
          <div>
            <input {...field} placeholder="ZIP Code" />
            {fieldState.error && (
              <p style={{ color: "red" }}>{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      <button type="button" onClick={() => navigateToPreviousStep()}>
        Previous
      </button>
      <button type="button" onClick={() => navigateToNextStep()}>
        Next
      </button>
    </div>
  );
};

// 🧱 Step 3: Confirmation
const ConfirmStep = () => {
  const { navigateToPreviousStep } = useSmartStepper();
  return (
    <div>
      <h2>Confirm Your Info</h2>
      <p>Please review your information before submitting.</p>
      <button type="button" onClick={() => navigateToPreviousStep()}>
        Previous
      </button>
      <button type="submit">Submit</button>
    </div>
  );
};

// 📦 Wrapper Component (optional styling)
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

// 🚀 Full Form
const MyMultiStepForm = () => {
  const config: SmartStepperConfig<"user" | "address" | "confirm"> = {
    start: "user",
    orchestration: {
      user: {
        next: (data: FieldValues) =>
          data.carType === "imported" ? "address" : "confirm",
      },
      address: {
        next: () => "confirm",
        previous: () => "user",
      },
      confirm: {
        previous: (data: FieldValues) =>
          data.carType === "imported" ? "address" : "user",
      },
    },
    validations: {
      user: {
        schema: yup.object({
          fullName: yup.string().required("Full Name is required"),
          email: yup
            .string()
            .email("Invalid email")
            .required("Email is required"),
          carType: yup.string().required("Car type is required"),
        }),
        defaultValues: { fullName: "", email: "", carType: "" },
      },
      address: {
        schema: yup.object({
          city: yup.string().required("City is required"),
          zip: yup.string().required("ZIP is required"),
        }),
        defaultValues: { city: "", zip: "" },
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
        component: <AddressStep />,
        wrapper: <CardWrapper borderColor="green" />,
      },
      confirm: {
        component: <ConfirmStep />,
        wrapper: <CardWrapper borderColor="orange" />,
      },
    },
    onSubmit: (data: FieldValues) => {
      console.log("Final submission", data);
      alert("Form submitted successfully!");
    },
  };

  return <SmartStepper config={config} />;
};

export default MyMultiStepForm;
