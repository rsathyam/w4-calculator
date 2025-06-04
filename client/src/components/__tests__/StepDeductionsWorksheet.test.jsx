import { render, screen } from '@testing-library/react';
import StepDeductionsWorksheet from '../StepDeductionsWorksheet';

test('shows itemized deductions input', () => {
  render(<StepDeductionsWorksheet form={{}} setForm={() => {}} />);
  expect(screen.getByText(/itemized deductions/i)).toBeInTheDocument();
});
