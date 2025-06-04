import { render, screen } from '@testing-library/react';
import StepIncomeDetails from '../StepIncomeDetails';

test('renders gross pay input', () => {
  render(<StepIncomeDetails form={{}} setForm={() => {}} />);
  expect(screen.getByPlaceholderText('$0')).toBeInTheDocument();
});
