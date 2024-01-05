import React from 'react';
import {
  render, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';

import {
  createMemoryRouter,
  RouterProvider,
} from 'react-router-dom';

import SiteLayout from '../../components/site-layout/site-layout';
import AdminHomeView from './home';

jest.mock('../../utils/request');

describe('Admin Home View', () => {
  it('should render', async () => {
    const router = createMemoryRouter([{
      element: <SiteLayout />,
      loader: () => ({
        id: 'testId',
        firstName: 'Test',
        permissions: ['PERMISSION'],
      }),
      children: [{
        path: '/test',
        element: <AdminHomeView />,
      }],
    }], { initialEntries: ['/test'] });

    const { getByText } = render(
      <RouterProvider router={router} />,
    );

    await waitFor(() => expect(getByText('Admin Dashboard')).toBeInTheDocument());

    expect(getByText('User Management')).toBeInTheDocument();
    expect(getByText('Manage Users')).toBeInTheDocument();
  });
});
