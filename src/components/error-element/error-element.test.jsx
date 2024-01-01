import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import {
  createMemoryRouter,
  RouterProvider,
  useNavigate,
} from 'react-router-dom';

import ErrorElement from './error-element';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Error Element', () => {
  let mockNavigate;
  beforeEach(() => {
    mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
  });
  it('should redirect on 401 responses', async () => {
    const router = createMemoryRouter([{
      path: '/test',
      element: <span />,
      errorElement: <ErrorElement />,
      loader: async () => {
        throw new Response('Unauthorized', { status: 401 });
      },
    }, {
      path: '/login',
      element: <span />,
    }], { initialEntries: ['/test'] });

    render(
      <RouterProvider router={router} />,
    );

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/login'));
  });
});
