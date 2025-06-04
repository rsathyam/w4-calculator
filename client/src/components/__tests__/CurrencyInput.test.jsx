import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrencyInput from '../CurrencyInput';

test('calls onChange with numeric value', async () => {
  const onChange = jest.fn();
  render(<CurrencyInput label="Amount" name="amt" value={0} onChange={onChange} />);
  const input = screen.getByPlaceholderText('$0');
  await userEvent.clear(input);
  await userEvent.type(input, '500');
  expect(onChange).toHaveBeenLastCalledWith('amt', 500);
});
