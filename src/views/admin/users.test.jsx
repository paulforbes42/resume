import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import {
  createMemoryRouter,
  RouterProvider,
} from 'react-router-dom';

import request from '../../utils/request';

import AdminUsersView from './users';

jest.mock('../../utils/request');

describe('Admin Users View', () => {
  it('should render', async () => {
    const router = createMemoryRouter([{
      path: '/test',
      element: <AdminUsersView />,
      loader: () => ({
        count: 89,
        rows: [
          {
            id: 'testId',
            firstName: 'testFirstName',
            lastName: 'testLastName',
            email: 'testEmail',
            createdAt: 'testCreatedAt',
          },
        ],
      }),
    }], { initialEntries: ['/test'] });

    const { getByText } = render(
      <RouterProvider router={router} />,
    );

    await waitFor(() => expect(getByText('User List')).toBeInTheDocument());
    expect(getByText('testId')).toBeInTheDocument();
    expect(getByText('testFirstName')).toBeInTheDocument();
    expect(getByText('testLastName')).toBeInTheDocument();
    expect(getByText('testEmail')).toBeInTheDocument();
    expect(getByText('testCreatedAt')).toBeInTheDocument();
  });

  it('should paginate the user list', async () => {
    request.mockReturnValue([]);
    const router = createMemoryRouter([{
      path: '/test',
      element: <AdminUsersView />,
      loader: () => ({
        count: 89,
        rows: [
          {
            id: 'testId',
            firstName: 'testFirstName',
            lastName: 'testLastName',
            email: 'testEmail',
            createdAt: 'testCreatedAt',
          },
        ],
      }),
    }], { initialEntries: ['/test'] });

    const { getByText, getByTestId } = render(
      <RouterProvider router={router} />,
    );

    await waitFor(() => expect(getByText('User List')).toBeInTheDocument());

    expect(getByTestId('pagination-8')).toBeInTheDocument();
    fireEvent.click(getByTestId('pagination-8'));

    await waitFor(() => expect(request).toHaveBeenCalledWith('/api/admin/user?page=8&limit=10'));
  });
});
