import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StepIncomeDetails from '../StepIncomeDetails';

test('renders gross pay input', () => {
  render(<StepIncomeDetails form={{}} setForm={() => {}} />);
  expect(screen.getByPlaceholderText('$0')).toBeInTheDocument();
});

test('updates filing status', async () => {
  const setForm = jest.fn();
  render(<StepIncomeDetails form={{}} setForm={setForm} />);
  await userEvent.selectOptions(
    screen.getByLabelText(/filing status/i),
    'married'
  );
  expect(setForm).toHaveBeenCalled();
});
