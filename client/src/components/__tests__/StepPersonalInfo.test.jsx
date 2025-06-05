import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StepPersonalInfo from '../StepPersonalInfo';

test('updates personal info fields', async () => {
  const setForm = jest.fn();
  render(<StepPersonalInfo form={{}} setForm={setForm} />);
  await userEvent.type(screen.getByLabelText(/first name/i), 'Jane');
  expect(setForm).toHaveBeenCalled();
});
