import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StepperForm from '../StepperForm';

jest.mock('jspdf', () => jest.fn());
jest.mock('../utils/fillW4Template', () => ({ fillW4Template: jest.fn() }));
jest.mock('@vercel/analytics', () => ({ track: jest.fn() }));

test('navigates between steps', async () => {
  render(<StepperForm />);
  // First step shows intro heading
  expect(screen.getByText(/welcome to the w-4 calculator/i)).toBeInTheDocument();
  await userEvent.click(screen.getByText(/next/i));
  // Next step should show pay and withholding heading
  expect(
    screen.getByRole('heading', { name: /pay & withholding/i })
  ).toBeInTheDocument();
});

test('logs step views when navigating', async () => {
  const { track } = require('@vercel/analytics');
  render(<StepperForm />);
  await screen.findByText(/welcome to the w-4 calculator/i);
  expect(track).toHaveBeenCalledWith('step_view', { step: 'Welcome' });
  await userEvent.click(screen.getByText(/next/i));
  await screen.findByRole('heading', { name: /pay & withholding/i });
  expect(track).toHaveBeenCalledWith('step_view', { step: 'Pay & Withholding' });
});

test('shows download button on final step', async () => {
  const { fillW4Template } = require('../utils/fillW4Template');
  render(<StepperForm />);
  // navigate to final step
  while (screen.queryByRole('button', { name: /next/i })) {
    await userEvent.click(screen.getByRole('button', { name: /next/i }));
  }
  const download = screen.getByRole('button', { name: /download completed w-4 form/i });
  await userEvent.click(download);
  expect(fillW4Template).toHaveBeenCalled();
});
