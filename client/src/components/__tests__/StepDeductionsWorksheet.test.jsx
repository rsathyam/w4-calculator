import { render, screen } from '@testing-library/react';
import StepDeductionsWorksheet from '../StepDeductionsWorksheet';

test('shows itemized deductions input', () => {
  render(<StepDeductionsWorksheet form={{}} setForm={() => {}} />);
  expect(
    screen.getByTitle(/itemized deductions beyond the standard/i)
  ).toBeInTheDocument();
});
