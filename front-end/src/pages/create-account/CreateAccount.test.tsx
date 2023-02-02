import React from 'react';
import { render, screen } from '@testing-library/react';
import CreateAccount from './CreateAccount';

test('renders learn react link', () => {
  render(<CreateAccount />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// code above modified from App.test.tsx