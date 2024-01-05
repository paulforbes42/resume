import React from 'react';
import {
  render,
} from '@testing-library/react';
import '@testing-library/jest-dom';

import {
  createMemoryRouter,
  RouterProvider,
} from 'react-router-dom';

import SiteLayout from '../site-layout/site-layout';
import ProtectedRoute from './protected-route';

jest.mock('../../utils/request');

describe('Admin User View', () => {
  it('should render child routes when permission is granted', async () => {
    function MockView() {
      return <span>View Displayed</span>;
    }

    const router = createMemoryRouter([{
      element: <SiteLayout />,
      loader: () => ({
        id: 'testId',
        firstName: 'Test',
        permissions: ['PERMISSION'],
      }),
      children: [{
        path: '/test',
        element: <ProtectedRoute />,
        children: [
          {
            path: '/test',
            element: <MockView />,
          },
        ],
      }],
    }], { initialEntries: ['/test'] });

    const { findByText } = render(
      <RouterProvider router={router} />,
    );

    expect(await findByText('View Displayed')).toBeInTheDocument();
  });

  it('should block access without permission', async () => {
    function MockView() {
      return <span>View Displayed</span>;
    }

    function MockLoginView() {
      return <span>Login Displayed</span>;
    }

    const router = createMemoryRouter([{
      element: <SiteLayout />,
      loader: () => ({
        id: 'testId',
        firstName: 'Test',
        permissions: [],
      }),
      children: [{
        path: '/test',
        element: <ProtectedRoute />,
        children: [
          {
            path: '/test',
            element: <MockView />,
          },
        ],
      }, {
        path: '/login',
        element: <MockLoginView />,
      }],
    }], { initialEntries: ['/test'] });

    const { findByText, queryByText } = render(
      <RouterProvider router={router} />,
    );

    expect(await findByText('Login Displayed')).toBeInTheDocument();
    expect(queryByText('View Displayed')).not.toBeInTheDocument();
  });
});
