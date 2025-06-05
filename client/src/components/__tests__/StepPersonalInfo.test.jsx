import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StepPersonalInfo from '../StepPersonalInfo';

test('updates filing status', async () => {
  const setForm = jest.fn();
  render(<StepPersonalInfo form={{}} setForm={setForm} />);
  await userEvent.selectOptions(
    screen.getByLabelText(/filing status/i),
    'married'
  );
  expect(setForm).toHaveBeenCalled();
});
