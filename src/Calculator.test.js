import React from 'react';
import { render } from '@testing-library/react';
import  Calculator from './Calculator';

test('renders learn react link', () => {
  const { getByText } = render(<Calculator/>);
  const linkElement = getByText(/Calculator/i);
  expect(linkElement).toBeInTheDocument();
});
