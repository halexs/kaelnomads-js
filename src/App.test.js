import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the home page navigation buttons', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: /our travels/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /alex's profile/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /keily's profile/i })).toBeInTheDocument();
});
