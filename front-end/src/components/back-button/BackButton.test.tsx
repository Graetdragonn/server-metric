import React from 'react';
import { render, screen } from '@testing-library/react';
import BackButton from './BackButton';

test('renders learn react link', () => {
  render(<BackButton />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// code above modified from App.test.tsx