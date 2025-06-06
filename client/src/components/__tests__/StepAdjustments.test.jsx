import { render, screen } from '@testing-library/react';
import StepAdjustments from '../StepAdjustments';

test('shows other income input', () => {
  render(<StepAdjustments form={{}} setForm={() => {}} />);
  expect(screen.getByText(/other income \(annual\)/i)).toBeInTheDocument();
});
