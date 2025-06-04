import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StepFilingStatus from '../StepFilingStatus';

test('updates filing status', async () => {
  const setForm = jest.fn();
  render(<StepFilingStatus form={{}} setForm={setForm} />);
  await userEvent.selectOptions(screen.getByLabelText(/filing status/i), 'married');
  expect(setForm).toHaveBeenCalledWith(expect.objectContaining({ filingStatus: 'married' }));
});
