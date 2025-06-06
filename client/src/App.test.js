import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('@vercel/analytics', () => ({ inject: jest.fn(), track: jest.fn() }));
jest.mock('jspdf', () => jest.fn());

test('renders app header', () => {
  render(<App />);
  const heading = screen.getByRole('heading', {
    name: /w-4 calculator & form generator/i,
  });
  expect(heading).toBeInTheDocument();
});
