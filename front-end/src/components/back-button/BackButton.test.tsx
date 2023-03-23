import React from 'react';
import { render, screen } from '@testing-library/react';
import BackButton from './BackButton';
import { BrowserRouter } from 'react-router-dom';

test('renders back button', () => {
render(<BrowserRouter> <BackButton></BackButton></BrowserRouter>)
  const backButton = screen.getByText(/back/i);
  expect(backButton).toBeInTheDocument();
});