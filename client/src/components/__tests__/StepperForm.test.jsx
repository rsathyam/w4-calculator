import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StepperForm from '../StepperForm';

jest.mock('jspdf', () => jest.fn());
jest.mock('../utils/fillW4Template', () => ({ fillW4Template: jest.fn() }));
jest.mock('../PdfPreview', () => () => <div>PDF Preview</div>);

test('navigates between steps', async () => {
  render(<StepperForm />);
  // First step shows intro heading
  expect(screen.getByText(/welcome to the w-4 calculator/i)).toBeInTheDocument();
  await userEvent.click(screen.getByText(/next/i));
  // Next step should show personal information heading
  expect(
    screen.getByRole('heading', { name: /personal information/i })
  ).toBeInTheDocument();
});
