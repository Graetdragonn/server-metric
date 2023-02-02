import React from 'react';
import { render, screen } from '@testing-library/react';
import StartPage from './Start';

test('renders learn react link', () => {
  render(<StartPage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// code above modified from App.test.tsx