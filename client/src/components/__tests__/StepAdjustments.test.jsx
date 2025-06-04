import { render, screen } from '@testing-library/react';
import StepAdjustments from '../StepAdjustments';

test('shows dependents input', () => {
  render(<StepAdjustments form={{}} setForm={() => {}} />);
  expect(screen.getByLabelText(/dependents under 17/i)).toBeInTheDocument();
});
