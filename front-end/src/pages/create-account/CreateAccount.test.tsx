import { render } from '@testing-library/react';
import CreateAccountPage from './CreateAccount';
import { BrowserRouter } from 'react-router-dom';

// test('test email input render', () => {
//   const { container } = render(<BrowserRouter><CreateAccountPage /></BrowserRouter>);
//   const inputEl = container.querySelector(`input[name="email"]`);
//   expect(inputEl).toBeInTheDocument();
// });

test('test first name input render', () => {
  const { container } = render(<BrowserRouter><CreateAccountPage /></BrowserRouter>);
  const inputEl = container.querySelector(`input[name="first"]`);
  expect(inputEl).toBeInTheDocument();
});

test('test last name input render', () => {
  const { container } = render(<BrowserRouter><CreateAccountPage /></BrowserRouter>);
  const inputEl = container.querySelector(`input[name="last"]`);
  expect(inputEl).toBeInTheDocument();
});

test('test password input render', () => {
  const { container } = render(<BrowserRouter><CreateAccountPage /></BrowserRouter>);
  const inputEl = container.querySelector(`input[name="pass"]`);
  expect(inputEl).toBeInTheDocument();
});

test('test confirm password input render', () => {
  const { container } = render(<BrowserRouter><CreateAccountPage /></BrowserRouter>);
  const inputEl = container.querySelector(`input[name="confirmPass"]`);
  expect(inputEl).toBeInTheDocument();
});