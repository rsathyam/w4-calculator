import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StepReview from '../StepReview';

jest.mock('../PaycheckPreview', () => () => <div>Preview</div>);

test('calls onDownload when button clicked', async () => {
  const onDownload = jest.fn();
  render(<StepReview form={{ grossPay: 1000 }} onDownload={onDownload} />);
  await userEvent.click(screen.getByRole('button', { name: /download/i }));
  expect(onDownload).toHaveBeenCalled();
});

test('does not display step2b data', () => {
  render(
    <StepReview
      form={{ grossPay: 1000, step2b: { line1: 1 } }}
      onDownload={() => {}}
    />,
  );
  expect(screen.queryByText(/step2b/i)).not.toBeInTheDocument();
});

test('formats currency fields with dollar sign', () => {
  render(
    <StepReview
      form={{ grossPay: 1000, extraWithholding: 50, secondJobIncome: 20, spouseIncome: 30 }}
      onDownload={() => {}}
    />,
  );
  expect(screen.getByText('$1,000')).toBeInTheDocument();
  expect(screen.getByText('$50')).toBeInTheDocument();
  expect(screen.getByText('$20')).toBeInTheDocument();
  expect(screen.getByText('$30')).toBeInTheDocument();
});
