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
