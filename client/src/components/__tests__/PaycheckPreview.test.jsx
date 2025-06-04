import { render, screen } from '@testing-library/react';
import PaycheckPreview from '../PaycheckPreview';

test('shows exempt message when marked exempt', () => {
  render(<PaycheckPreview formData={{ grossPay: 1000, exempt: true }} />);
  expect(screen.getByText(/exempt from withholding/i)).toBeInTheDocument();
});
