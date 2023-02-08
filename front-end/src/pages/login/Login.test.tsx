import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginPage from './Login';
import { BrowserRouter } from 'react-router-dom';

test('test email input render', () => {
  const { container } = render(<BrowserRouter><LoginPage /></BrowserRouter>);
  const inputEl = container.querySelector(`input[name="email"]`);
  expect(inputEl).toBeInTheDocument();
});

test('test password input render', () => {
  const { container } = render(<BrowserRouter><LoginPage /></BrowserRouter>);
  const inputEl = container.querySelector(`input[name="pass"]`);
  expect(inputEl).toBeInTheDocument();
});
