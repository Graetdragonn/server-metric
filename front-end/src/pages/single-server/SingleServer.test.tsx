import React from 'react';
import { render, screen } from '@testing-library/react';
import SingleServer from './SingleServer';

test('renders learn react link', () => {
  render(<SingleServer />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// code above modified from App.test.tsx