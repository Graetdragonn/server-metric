import React from 'react';
import { render, screen } from '@testing-library/react';
import EditSettings from './EditSettings';

test('renders learn react link', () => {
  render(<EditSettings />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// code above modified from App.test.tsx