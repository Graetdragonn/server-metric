import React from 'react';
import { render, screen } from '@testing-library/react';
import Graph from './Graph';

test('renders learn react link', () => {
  render(<Graph />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// code above modified from App.test.tsx