import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import * as rhf from 'react-hook-form';
import { SmartStepperContext } from './_context';
import { useSmartStepper, useSmartStepperController } from './_hooks';

// Helper: full mock context value
const fullMockContext = {
  navigateToNextStep: jest.fn(),
  navigateToPreviousStep: jest.fn(),
  registerStepperFields: jest.fn(),
  getStepperFieldValues: jest.fn(),
  setStepperFieldValues: jest.fn(),
  stepperFieldResetter: jest.fn(),
  canNavigateToNextStep: jest.fn(),
  control: {} as unknown as rhf.Control<rhf.FieldValues, rhf.FieldValues>,
};

// Test useSmartStepper
it('useSmartStepper returns context value', () => {
  let value;
  function TestComponent() {
    value = useSmartStepper();
    return <div>Test</div>;
  }
  render(
    <SmartStepperContext.Provider value={fullMockContext}>
      <TestComponent />
    </SmartStepperContext.Provider>
  );
  expect(value).toBe(fullMockContext);
});

// Test useSmartStepperController (integration with context)
it('useSmartStepperController uses context control', () => {
  const mockField = { name: 'test', value: '', onChange: jest.fn(), onBlur: jest.fn(), ref: jest.fn() };
  jest.spyOn(rhf, 'useController').mockReturnValue({ field: mockField, formState: {}, fieldState: {} } as unknown as ReturnType<typeof rhf.useController>);
  function TestComponent() {
    const { field } = useSmartStepperController({ name: 'test' });
    return <input {...field} />;
  }
  const { getByRole } = render(
    <SmartStepperContext.Provider value={fullMockContext}>
      <TestComponent />
    </SmartStepperContext.Provider>
  );
  expect(getByRole('textbox')).toBeInTheDocument();
});
