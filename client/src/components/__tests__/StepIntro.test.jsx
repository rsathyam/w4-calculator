import { render, screen } from '@testing-library/react';
import StepIntro from '../StepIntro';

test('renders welcome heading', () => {
  render(<StepIntro />);
  expect(screen.getByText(/welcome to the w-4 calculator/i)).toBeInTheDocument();
});
