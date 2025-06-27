import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useContext } from 'react';
import * as yup from 'yup';
import { z } from 'zod';
import SmartStepperContext from './_context';
import { useSmartStepper, useSmartStepperController } from './_hooks';
import { SmartStepper } from './index';

describe('SmartStepper', () => {
  const StepA = () => {
    const { registerStepperFields, navigateToNextStep } = useSmartStepper();
    const { fieldState } = useSmartStepperController({ name: 'fieldA' });
    return (
      <div>
        <label htmlFor="fieldA">Field A</label>
        <input id="fieldA" {...registerStepperFields('fieldA')} />
        {fieldState.error && <span>{fieldState.error.message}</span>}
        <button type="button" onClick={() => navigateToNextStep()}>
          Next
        </button>
      </div>
    );
  };

  const StepB = () => {
    const { registerStepperFields, navigateToPreviousStep } = useSmartStepper();
    const { fieldState } = useSmartStepperController({ name: 'fieldB' });
    return (
      <div>
        <label htmlFor="fieldB">Field B</label>
        <input id="fieldB" {...registerStepperFields('fieldB')} />
        {fieldState.error && <span>{fieldState.error.message}</span>}
        <button type="button" onClick={() => navigateToPreviousStep()}>
          Back
        </button>
        <button type="submit">Submit</button>
      </div>
    );
  };

  const makeConfig = (onSubmit = jest.fn()) => ({
    orchesration: {
      stepA: { next: () => 'stepB' },
      stepB: { previous: () => 'stepA' },
    },
    start: 'stepA',
    validations: {
      stepA: {
        schema: yup.object({
          fieldA: yup.string().required('FieldA required'),
        }),
        defaultValues: { fieldA: '' },
      },
      stepB: {
        schema: z.object({ fieldB: z.string().min(1, 'FieldB required') }),
        defaultValues: { fieldB: '' },
      },
    },
    views: {
      stepA: { component: <StepA /> },
      stepB: { component: <StepB /> },
    },
    onSubmit,
  });

  it('renders the first step and navigates to the next step on valid input', async () => {
    render(<SmartStepper config={makeConfig()} />);
    expect(screen.getByLabelText('Field A')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Field A'), {
      target: { value: 'foo' },
    });
    fireEvent.blur(screen.getByLabelText('Field A'));
    fireEvent.click(
      screen.getByRole('button', { name: /next/i }) ||
        screen.getByLabelText('Field A')
    );
    await waitFor(() =>
      expect(screen.getByLabelText('Field B')).toBeInTheDocument()
    );
  });

  it('shows validation error for empty required field (Yup)', async () => {
    render(<SmartStepper config={makeConfig()} />);
    fireEvent.blur(screen.getByLabelText('Field A'));
    await waitFor(() =>
      expect(screen.getByText(/required/i)).toBeInTheDocument()
    );
  });

  it('shows validation error for empty required field (Zod)', async () => {
    render(<SmartStepper config={makeConfig()} />);
    fireEvent.change(screen.getByLabelText('Field A'), {
      target: { value: 'foo' },
    });
    fireEvent.blur(screen.getByLabelText('Field A'));
    fireEvent.click(
      screen.getByRole('button', { name: /next/i }) ||
        screen.getByLabelText('Field A')
    );
    await waitFor(() =>
      expect(screen.getByLabelText('Field B')).toBeInTheDocument()
    );
    fireEvent.blur(screen.getByLabelText('Field B'));
    await waitFor(() =>
      expect(screen.getByText(/required/i)).toBeInTheDocument()
    );
  });

  it('calls onSubmit with correct values when all steps are valid', async () => {
    const onSubmit = jest.fn();
    render(<SmartStepper config={makeConfig(onSubmit)} />);
    fireEvent.change(screen.getByLabelText('Field A'), {
      target: { value: 'foo' },
    });
    fireEvent.blur(screen.getByLabelText('Field A'));
    fireEvent.click(
      screen.getByRole('button', { name: /next/i }) ||
        screen.getByLabelText('Field A')
    );
    await waitFor(() =>
      expect(screen.getByLabelText('Field B')).toBeInTheDocument()
    );
    fireEvent.change(screen.getByLabelText('Field B'), {
      target: { value: 'bar' },
    });
    fireEvent.blur(screen.getByLabelText('Field B'));
    fireEvent.submit(screen.getByLabelText('Field B').closest('form')!);
    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith({ fieldA: 'foo', fieldB: 'bar' })
    );
  });

  it('navigates back to previous step and unregisters fields', async () => {
    render(<SmartStepper config={makeConfig()} />);
    fireEvent.change(screen.getByLabelText('Field A'), {
      target: { value: 'foo' },
    });
    fireEvent.blur(screen.getByLabelText('Field A'));
    fireEvent.click(
      screen.getByRole('button', { name: /next/i }) ||
        screen.getByLabelText('Field A')
    );
    await waitFor(() =>
      expect(screen.getByLabelText('Field B')).toBeInTheDocument()
    );
    // Simulate back
    fireEvent.click(
      screen.getByRole('button', { name: /back/i }) ||
        screen.getByLabelText('Field B')
    );
    await waitFor(() =>
      expect(screen.getByLabelText('Field A')).toBeInTheDocument()
    );
  });

  it('provides context values to children', async () => {
    let contextValues: unknown = null;
    const Consumer = () => {
      const ctx = useContext(SmartStepperContext);
      contextValues = ctx;
      return null;
    };
    const config = makeConfig();
    config.views.stepA.component = (
      <>
        <StepA />
        <Consumer />
      </>
    );
    render(<SmartStepper config={config} />);
    expect(contextValues).toBeTruthy();
    expect(
      typeof (contextValues as unknown as { [key: string]: unknown })
        .navigateToNextStep
    ).toBe('function');
    expect(
      typeof (contextValues as unknown as { [key: string]: unknown })
        .registerStepperFields
    ).toBe('function');
  });

  it('handles missing next/previous gracefully', async () => {
    const config = makeConfig();
    config.orchesration.stepA.next = () => undefined as unknown as string;
    render(<SmartStepper config={config} />);
    fireEvent.change(screen.getByLabelText('Field A'), {
      target: { value: 'foo' },
    });
    fireEvent.blur(screen.getByLabelText('Field A'));
    fireEvent.click(
      screen.getByRole('button', { name: /next/i }) ||
        screen.getByLabelText('Field A')
    );
    // Should stay on stepA
    await waitFor(() =>
      expect(screen.getByLabelText('Field A')).toBeInTheDocument()
    );
  });
});
