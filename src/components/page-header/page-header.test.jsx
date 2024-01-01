import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import {
  createMemoryRouter,
  RouterProvider,
  useNavigate,
} from 'react-router-dom';

import PageHeader from './page-header';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Page Header', () => {
  let mockNavigate;

  beforeEach(() => {
    mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
  });

  it('should render', async () => {
    const router = createMemoryRouter([{
      path: '/test',
      element: <PageHeader />,
    }], { initialEntries: ['/test'] });

    const { getByText } = render(
      <RouterProvider router={router} />,
    );

    expect(getByText('Welcome!')).toBeInTheDocument();
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Logout')).toBeInTheDocument();
  });

  it('should logout', async () => {
    const mockRemoveItem = jest.spyOn(window.sessionStorage, 'removeItem');
    const router = createMemoryRouter([{
      path: '/test',
      element: <PageHeader />,
    }], { initialEntries: ['/test'] });

    const { getByText } = render(
      <RouterProvider router={router} />,
    );

    fireEvent.click(getByText('Logout'));

    expect(mockRemoveItem).toHaveBeenCalledWith('a');
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('should display the users first name', () => {
    const mockUser = {
      firstName: 'TestFirstName',
    };
    const router = createMemoryRouter([{
      path: '/test',
      element: <PageHeader user={mockUser} />,
    }], { initialEntries: ['/test'] });

    const { getByText } = render(
      <RouterProvider router={router} />,
    );

    expect(getByText('TestFirstName')).toBeInTheDocument();
  });
});
