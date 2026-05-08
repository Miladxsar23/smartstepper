import {
  Button,
  Card,
  CardBody,
  Checkbox,
  Chip,
  Divider,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from '@heroui/react';
import { useState } from 'react';
import {
  Controller,
  SmartStepper,
  useSmartStepper,
  type FieldValues,
  type SmartStepperConfig,
} from 'smartstepper';
import * as yup from 'yup';

// 🧱 Step 1: Account Type Selection
const AccountTypeStep = ({ title }: { title: string }) => {
  const { control, navigateToNextStep } = useSmartStepper();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-500 mt-1">
          Choose the type of account you want to create
        </p>
      </div>

      <Controller
        name="accountType"
        control={control}
        render={({ field, fieldState }) => (
          <RadioGroup
            {...field}
            onValueChange={(value) => field.onChange(value)}
            label="Account Type"
            isInvalid={!!fieldState.error}
            errorMessage={fieldState.error?.message}
            classNames={{
              wrapper: 'gap-4',
            }}
          >
            <Radio value="personal" description="For individual use">
              Personal Account
            </Radio>
            <Radio
              value="business"
              description="For companies and organizations"
            >
              Business Account
            </Radio>
            <Radio value="enterprise" description="For large-scale operations">
              Enterprise Account
            </Radio>
          </RadioGroup>
        )}
      />

      <div className="flex justify-end pt-4">
        <Button
          type="button"
          color="primary"
          size="lg"
          onClick={() => navigateToNextStep()}
          className="px-8"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

// 🧱 Step 2: Personal Information
const PersonalInfoStep = () => {
  const {
    control,
    navigateToNextStep,
    navigateToPreviousStep,
    watchStepperFieldValues,
  } = useSmartStepper();

  const accountType = watchStepperFieldValues('accountType');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Personal Information
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {accountType === 'personal'
            ? 'Tell us about yourself'
            : 'Primary contact information'}
        </p>
      </div>

      <Controller
        name="fullName"
        control={control}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            label="Full Name"
            placeholder="Enter your full name"
            variant="bordered"
            isInvalid={!!fieldState.error}
            errorMessage={fieldState.error?.message}
            classNames={{
              input: 'text-base',
              inputWrapper: 'h-12',
            }}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            variant="bordered"
            isInvalid={!!fieldState.error}
            errorMessage={fieldState.error?.message}
            classNames={{
              input: 'text-base',
              inputWrapper: 'h-12',
            }}
          />
        )}
      />

      <Controller
        name="phone"
        control={control}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            label="Phone Number"
            placeholder="Enter your phone number"
            variant="bordered"
            isInvalid={!!fieldState.error}
            errorMessage={fieldState.error?.message}
            classNames={{
              input: 'text-base',
              inputWrapper: 'h-12',
            }}
          />
        )}
      />

      <div className="flex justify-between pt-4">
        <Button
          type="button"
          variant="bordered"
          size="lg"
          onClick={() => navigateToPreviousStep()}
          className="px-8"
        >
          Previous
        </Button>
        <Button
          type="button"
          color="primary"
          size="lg"
          onClick={() => navigateToNextStep()}
          className="px-8"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

// 🧱 Step 3: Business Details (only for business/enterprise)
const BusinessDetailsStep = () => {
  const { control, navigateToNextStep, navigateToPreviousStep } =
    useSmartStepper();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Business Details</h2>
        <p className="text-sm text-gray-500 mt-1">
          Tell us about your organization
        </p>
      </div>

      <Controller
        name="companyName"
        control={control}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            label="Company Name"
            placeholder="Enter company name"
            variant="bordered"
            isInvalid={!!fieldState.error}
            errorMessage={fieldState.error?.message}
            classNames={{
              input: 'text-base',
              inputWrapper: 'h-12',
            }}
          />
        )}
      />

      <Controller
        name="industry"
        control={control}
        render={({ field, fieldState }) => (
          <Select
            {...field}
            selectedKeys={field.value ? [field.value] : []}
            onSelectionChange={(keys) => {
              const value = Array.from(keys)[0];
              field.onChange(value);
            }}
            label="Industry"
            placeholder="Select your industry"
            variant="bordered"
            isInvalid={!!fieldState.error}
            errorMessage={fieldState.error?.message}
            classNames={{
              trigger: 'h-12',
            }}
          >
            <SelectItem key="technology">Technology</SelectItem>
            <SelectItem key="finance">Finance</SelectItem>
            <SelectItem key="healthcare">Healthcare</SelectItem>
            <SelectItem key="retail">Retail</SelectItem>
            <SelectItem key="manufacturing">Manufacturing</SelectItem>
            <SelectItem key="other">Other</SelectItem>
          </Select>
        )}
      />

      <Controller
        name="employeeCount"
        control={control}
        render={({ field, fieldState }) => (
          <Select
            {...field}
            selectedKeys={field.value ? [field.value] : []}
            onSelectionChange={(keys) => {
              const value = Array.from(keys)[0];
              field.onChange(value);
            }}
            label="Number of Employees"
            placeholder="Select employee count"
            variant="bordered"
            isInvalid={!!fieldState.error}
            errorMessage={fieldState.error?.message}
            classNames={{
              trigger: 'h-12',
            }}
          >
            <SelectItem key="1-10">1-10</SelectItem>
            <SelectItem key="11-50">11-50</SelectItem>
            <SelectItem key="51-200">51-200</SelectItem>
            <SelectItem key="201-500">201-500</SelectItem>
            <SelectItem key="500+">500+</SelectItem>
          </Select>
        )}
      />

      <div className="flex justify-between pt-4">
        <Button
          type="button"
          variant="bordered"
          size="lg"
          onClick={() => navigateToPreviousStep()}
          className="px-8"
        >
          Previous
        </Button>
        <Button
          type="button"
          color="primary"
          size="lg"
          onClick={() => navigateToNextStep()}
          className="px-8"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

// 🧱 Step 4: Service Selection
const ServiceSelectionStep = () => {
  const {
    control,
    navigateToNextStep,
    navigateToPreviousStep,
    watchStepperFieldValues,
  } = useSmartStepper();

  const accountType = watchStepperFieldValues('accountType');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Service Selection</h2>
        <p className="text-sm text-gray-500 mt-1">
          Choose the services you need
        </p>
      </div>

      <Controller
        name="plan"
        control={control}
        render={({ field, fieldState }) => (
          <RadioGroup
            {...field}
            label="Subscription Plan"
            isInvalid={!!fieldState.error}
            errorMessage={fieldState.error?.message}
            classNames={{
              wrapper: 'gap-4',
            }}
          >
            <Radio value="basic" description="Essential features - $9/month">
              Basic Plan
            </Radio>
            <Radio value="pro" description="Advanced features - $29/month">
              Pro Plan
            </Radio>
            {(accountType === 'business' || accountType === 'enterprise') && (
              <Radio value="premium" description="All features - $99/month">
                Premium Plan
              </Radio>
            )}
          </RadioGroup>
        )}
      />

      <Controller
        name="addons"
        control={control}
        render={({ field }) => (
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">
              Additional Services (Optional)
            </label>
            <div className="space-y-2">
              <Checkbox
                isSelected={field.value?.includes('support')}
                onValueChange={(checked) => {
                  const current = field.value || [];
                  field.onChange(
                    checked
                      ? [...current, 'support']
                      : current.filter((v: string) => v !== 'support')
                  );
                }}
              >
                24/7 Priority Support (+$15/month)
              </Checkbox>
              <Checkbox
                isSelected={field.value?.includes('backup')}
                onValueChange={(checked) => {
                  const current = field.value || [];
                  field.onChange(
                    checked
                      ? [...current, 'backup']
                      : current.filter((v: string) => v !== 'backup')
                  );
                }}
              >
                Automated Backup (+$10/month)
              </Checkbox>
              <Checkbox
                isSelected={field.value?.includes('analytics')}
                onValueChange={(checked) => {
                  const current = field.value || [];
                  field.onChange(
                    checked
                      ? [...current, 'analytics']
                      : current.filter((v: string) => v !== 'analytics')
                  );
                }}
              >
                Advanced Analytics (+$20/month)
              </Checkbox>
            </div>
          </div>
        )}
      />

      <div className="flex justify-between pt-4">
        <Button
          type="button"
          variant="bordered"
          size="lg"
          onClick={() => navigateToPreviousStep()}
          className="px-8"
        >
          Previous
        </Button>
        <Button
          type="button"
          color="primary"
          size="lg"
          onClick={() => navigateToNextStep()}
          className="px-8"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

// 🧱 Step 5: Payment Method (only for pro/premium plans)
const PaymentMethodStep = () => {
  const { control, navigateToNextStep, navigateToPreviousStep } =
    useSmartStepper();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Payment Method</h2>
        <p className="text-sm text-gray-500 mt-1">How would you like to pay?</p>
      </div>

      <Controller
        name="paymentMethod"
        control={control}
        render={({ field, fieldState }) => (
          <RadioGroup
            {...field}
            label="Payment Method"
            isInvalid={!!fieldState.error}
            errorMessage={fieldState.error?.message}
            classNames={{
              wrapper: 'gap-4',
            }}
          >
            <Radio value="credit-card" description="Visa, Mastercard, Amex">
              Credit Card
            </Radio>
            <Radio value="paypal" description="Pay with PayPal account">
              PayPal
            </Radio>
            <Radio value="bank-transfer" description="Direct bank transfer">
              Bank Transfer
            </Radio>
          </RadioGroup>
        )}
      />

      <Controller
        name="billingCycle"
        control={control}
        render={({ field, fieldState }) => (
          <RadioGroup
            {...field}
            label="Billing Cycle"
            isInvalid={!!fieldState.error}
            errorMessage={fieldState.error?.message}
            classNames={{
              wrapper: 'gap-4',
            }}
          >
            <Radio value="monthly" description="Billed every month">
              Monthly
            </Radio>
            <Radio value="yearly" description="Billed annually (Save 20%)">
              Yearly
            </Radio>
          </RadioGroup>
        )}
      />

      <div className="flex justify-between pt-4">
        <Button
          type="button"
          variant="bordered"
          size="lg"
          onClick={() => navigateToPreviousStep()}
          className="px-8"
        >
          Previous
        </Button>
        <Button
          type="button"
          color="primary"
          size="lg"
          onClick={() => navigateToNextStep()}
          className="px-8"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

// 🧱 Step 6: Review & Summary - Shows complete navigation history and all collected data
const ReviewSummaryStep = () => {
  const { navigateToPreviousStep, watchStepperFieldValues } = useSmartStepper();
  const [navigationHistory] = useState<string[]>(() => {
    // Track navigation path through steps
    const allData = watchStepperFieldValues();
    const history = ['accountType', 'personalInfo'];

    if (
      allData.accountType === 'business' ||
      allData.accountType === 'enterprise'
    ) {
      history.push('businessDetails');
    }

    history.push('serviceSelection');

    if (allData.plan === 'pro' || allData.plan === 'premium') {
      history.push('paymentMethod');
    }

    history.push('review');
    return history;
  });

  const allData = watchStepperFieldValues();

  const stepLabels: Record<string, string> = {
    accountType: 'Account Type',
    personalInfo: 'Personal Information',
    businessDetails: 'Business Details',
    serviceSelection: 'Service Selection',
    paymentMethod: 'Payment Method',
    review: 'Review & Summary',
  };

  const formatValue = (value: unknown): string => {
    if (Array.isArray(value)) {
      return value.length > 0 ? value.join(', ') : 'None';
    }
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    if (value === null || value === undefined || value === '') {
      return 'Not provided';
    }
    return String(value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Review & Summary</h2>
        <p className="text-sm text-gray-500 mt-1">
          Review your journey and all collected information
        </p>
      </div>

      {/* Navigation History */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-blue-600">📍</span>
          Your Navigation Path
        </h3>
        <div className="flex flex-wrap gap-2">
          {navigationHistory.map((step, index) => (
            <div key={step} className="flex items-center gap-2">
              <Chip
                color={
                  index === navigationHistory.length - 1 ? 'primary' : 'default'
                }
                variant={
                  index === navigationHistory.length - 1 ? 'solid' : 'flat'
                }
                size="lg"
              >
                {index + 1}. {stepLabels[step]}
              </Chip>
              {index < navigationHistory.length - 1 && (
                <span className="text-gray-400 text-xl">→</span>
              )}
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-600 mt-4">
          You navigated through <strong>{navigationHistory.length}</strong>{' '}
          steps based on your selections. SmartStepper dynamically adjusted your
          path using conditional routing.
        </p>
      </div>

      <Divider className="my-6" />

      {/* Collected Data Summary */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <span className="text-green-600">✓</span>
          Collected Information
        </h3>

        {/* Account Type Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Chip color="primary" size="sm" variant="flat">
              Step 1
            </Chip>
            Account Type
          </h4>
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Account Type:</span>
              <span className="font-medium text-gray-900 capitalize">
                {formatValue(allData.accountType)}
              </span>
            </div>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Chip color="secondary" size="sm" variant="flat">
              Step 2
            </Chip>
            Personal Information
          </h4>
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Full Name:</span>
              <span className="font-medium text-gray-900">
                {formatValue(allData.fullName)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium text-gray-900">
                {formatValue(allData.email)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="font-medium text-gray-900">
                {formatValue(allData.phone)}
              </span>
            </div>
          </div>
        </div>

        {/* Business Details Section - Conditional */}
        {(allData.accountType === 'business' ||
          allData.accountType === 'enterprise') && (
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Chip color="success" size="sm" variant="flat">
                Step 3
              </Chip>
              Business Details
            </h4>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Company Name:</span>
                <span className="font-medium text-gray-900">
                  {formatValue(allData.companyName)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Industry:</span>
                <span className="font-medium text-gray-900 capitalize">
                  {formatValue(allData.industry)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Employee Count:</span>
                <span className="font-medium text-gray-900">
                  {formatValue(allData.employeeCount)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Service Selection Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Chip color="warning" size="sm" variant="flat">
              Step{' '}
              {allData.accountType === 'business' ||
              allData.accountType === 'enterprise'
                ? '4'
                : '3'}
            </Chip>
            Service Selection
          </h4>
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Plan:</span>
              <span className="font-medium text-gray-900 capitalize">
                {formatValue(allData.plan)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Add-ons:</span>
              <span className="font-medium text-gray-900 capitalize">
                {formatValue(allData.addons)}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Method Section - Conditional */}
        {(allData.plan === 'pro' || allData.plan === 'premium') && (
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Chip color="danger" size="sm" variant="flat">
                Step{' '}
                {allData.accountType === 'business' ||
                allData.accountType === 'enterprise'
                  ? '5'
                  : '4'}
              </Chip>
              Payment Method
            </h4>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium text-gray-900 capitalize">
                  {formatValue(allData.paymentMethod)?.replace('-', ' ')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Billing Cycle:</span>
                <span className="font-medium text-gray-900 capitalize">
                  {formatValue(allData.billingCycle)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SmartStepper Features Highlight */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <span className="text-purple-600">⚡</span>
          SmartStepper Features Demonstrated
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">✓</span>
            <span>
              <strong>Conditional Routing:</strong> Business details step only
              shown for business/enterprise accounts
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">✓</span>
            <span>
              <strong>Dynamic Navigation:</strong> Payment step only appears for
              pro/premium plans
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">✓</span>
            <span>
              <strong>State Management:</strong> All form data persisted across
              steps using state machine
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">✓</span>
            <span>
              <strong>Validation:</strong> Each step validated independently
              with Yup schemas
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">✓</span>
            <span>
              <strong>Bidirectional Navigation:</strong> Smart previous button
              routing based on user's path
            </span>
          </li>
        </ul>
      </div>

      <div className="flex justify-between pt-4">
        <Button
          type="button"
          variant="bordered"
          size="lg"
          onClick={() => navigateToPreviousStep()}
          className="px-8"
        >
          Previous
        </Button>
        <Button type="submit" color="success" size="lg" className="px-8">
          Submit Application
        </Button>
      </div>
    </div>
  );
};

// 📦 Wrapper Component with HeroUI Card
const CardWrapper = ({
  children,
  borderColor,
}: {
  children?: React.ReactNode;
  borderColor: string;
}) => {
  const colorMap: Record<string, string> = {
    blue: 'border-blue-500',
    green: 'border-green-500',
    orange: 'border-orange-500',
    purple: 'border-purple-500',
    pink: 'border-pink-500',
    indigo: 'border-indigo-500',
  };

  return (
    <Card
      className={`max-w-2xl mx-auto shadow-lg border-t-4 ${
        colorMap[borderColor] || 'border-gray-500'
      }`}
    >
      <CardBody className="p-8">{children}</CardBody>
    </Card>
  );
};

// 🚀 Full Form
const MyMultiStepForm = () => {
  const config: SmartStepperConfig<
    | 'accountType'
    | 'personalInfo'
    | 'businessDetails'
    | 'serviceSelection'
    | 'paymentMethod'
    | 'review'
  > = {
    start: 'accountType',
    orchestration: {
      accountType: {
        next: () => 'personalInfo',
      },
      personalInfo: {
        next: (data: FieldValues) =>
          data.accountType === 'business' || data.accountType === 'enterprise'
            ? 'businessDetails'
            : 'serviceSelection',
        previous: () => 'accountType',
      },
      businessDetails: {
        next: () => 'serviceSelection',
        previous: () => 'personalInfo',
      },
      serviceSelection: {
        next: (data: FieldValues) =>
          data.plan === 'pro' || data.plan === 'premium'
            ? 'paymentMethod'
            : 'review',
        previous: (data: FieldValues) =>
          data.accountType === 'business' || data.accountType === 'enterprise'
            ? 'businessDetails'
            : 'personalInfo',
      },
      paymentMethod: {
        next: () => 'review',
        previous: () => 'serviceSelection',
      },
      review: {
        previous: (data: FieldValues) =>
          data.plan === 'pro' || data.plan === 'premium'
            ? 'paymentMethod'
            : 'serviceSelection',
      },
    },
    validations: {
      accountType: {
        schema: yup.object({
          accountType: yup
            .string()
            .oneOf(['personal', 'business', 'enterprise'])
            .required('Please select an account type'),
        }),
        defaultValues: { accountType: '' },
      },
      personalInfo: {
        schema: yup.object({
          fullName: yup.string().required('Full Name is required'),
          email: yup
            .string()
            .email('Invalid email')
            .required('Email is required'),
          phone: yup
            .string()
            .matches(/^[0-9+\-\s()]+$/, 'Invalid phone number')
            .required('Phone number is required'),
        }),
        defaultValues: { fullName: '', email: '', phone: '' },
      },
      businessDetails: {
        schema: yup.object({
          companyName: yup.string().required('Company name is required'),
          industry: yup.string().required('Industry is required'),
          employeeCount: yup.string().required('Employee count is required'),
        }),
        defaultValues: { companyName: '', industry: '', employeeCount: '' },
      },
      serviceSelection: {
        schema: yup.object({
          plan: yup
            .string()
            .oneOf(['basic', 'pro', 'premium'])
            .required('Please select a plan'),
          addons: yup.array().of(yup.string()),
        }),
        defaultValues: { plan: '', addons: [] },
      },
      paymentMethod: {
        schema: yup.object({
          paymentMethod: yup
            .string()
            .oneOf(['credit-card', 'paypal', 'bank-transfer'])
            .required('Please select a payment method'),
          billingCycle: yup
            .string()
            .oneOf(['monthly', 'yearly'])
            .required('Please select a billing cycle'),
        }),
        defaultValues: { paymentMethod: '', billingCycle: '' },
      },
      review: {
        schema: yup.object(),
        defaultValues: {},
      },
    },
    views: {
      accountType: {
        component: <AccountTypeStep title="Account Type Selection" />,
        wrapper: <CardWrapper borderColor="blue" />,
      },
      personalInfo: {
        component: <PersonalInfoStep />,
        wrapper: <CardWrapper borderColor="green" />,
      },
      businessDetails: {
        component: <BusinessDetailsStep />,
        wrapper: <CardWrapper borderColor="purple" />,
      },
      serviceSelection: {
        component: <ServiceSelectionStep />,
        wrapper: <CardWrapper borderColor="orange" />,
      },
      paymentMethod: {
        component: <PaymentMethodStep />,
        wrapper: <CardWrapper borderColor="pink" />,
      },
      review: {
        component: <ReviewSummaryStep />,
        wrapper: <CardWrapper borderColor="indigo" />,
      },
    },
    onSubmit: (data: FieldValues) => {
      console.log('Final submission', data);
      alert(
        `Application submitted successfully!\n\nAccount Type: ${data.accountType}\nName: ${data.fullName}\nEmail: ${data.email}\nPlan: ${data.plan}`
      );
    },
  };

  return <SmartStepper config={config} />;
};

export default MyMultiStepForm;
