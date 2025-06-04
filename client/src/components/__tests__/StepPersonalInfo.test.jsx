import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StepPersonalInfo from '../StepPersonalInfo';

test('calls setForm on input', async () => {
  const setForm = jest.fn();
  render(<StepPersonalInfo form={{}} setForm={setForm} />);
  const input = screen.getByPlaceholderText('John');
  await userEvent.type(input, 'Jane');
  expect(setForm).toHaveBeenCalled();
});
