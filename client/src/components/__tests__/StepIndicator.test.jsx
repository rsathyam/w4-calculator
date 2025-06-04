import { render, screen } from '@testing-library/react';
import StepIndicator from '../StepIndicator';

test('highlights the current step', () => {
  const steps = [{ title: 'One' }, { title: 'Two' }];
  render(<StepIndicator steps={steps} current={1} />);
  expect(screen.getByText('One')).toBeInTheDocument();
  const current = screen.getByText('Two');
  expect(current.className).toMatch(/text-blue-600/);
});
