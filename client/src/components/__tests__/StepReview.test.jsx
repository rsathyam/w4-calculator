import { render, screen, waitFor } from '@testing-library/react';
import StepReview from '../StepReview';
import { fillW4Template } from '../utils/fillW4Template';

jest.mock('../PaycheckPreview', () => () => <div>Preview</div>);
jest.mock('../utils/fillW4Template', () => ({
  fillW4Template: jest.fn(() => Promise.resolve(new Uint8Array([1, 2, 3]))),
}));

beforeAll(() => {
  const create = jest.fn(() => 'blob:preview');
  const revoke = jest.fn();
  global.URL.createObjectURL = create;
  global.URL.revokeObjectURL = revoke;
  if (window.URL) {
    window.URL.createObjectURL = create;
    window.URL.revokeObjectURL = revoke;
  }
});


test('generates pdf preview', async () => {
  render(<StepReview form={{ grossPay: 1000 }} />);
  await waitFor(() => expect(fillW4Template).toHaveBeenCalled());
});
