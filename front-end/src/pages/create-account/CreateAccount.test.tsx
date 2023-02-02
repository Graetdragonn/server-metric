import React from 'react';
import { render, screen } from '@testing-library/react';
import CreateAccountPage from './CreateAccount';

test('renders learn react link', () => {
  render(<CreateAccountPage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// code above modified from App.test.tsx