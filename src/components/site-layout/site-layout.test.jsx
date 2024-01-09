import React, {
  useContext,
  useEffect,
} from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import {
  createMemoryRouter,
  RouterProvider,
} from 'react-router-dom';

import ToastContext from '../../context/toast';
import SiteLayout from './site-layout';

describe('Site Layout', () => {
  it('should render', async () => {
    const router = createMemoryRouter([{
      path: '/test',
      element: <SiteLayout />,
      loader: () => ({
        id: 'testUserId',
        firstName: 'Test',
        permissions: [],
      }),
    }], { initialEntries: ['/test'] });

    const { findByTestId } = render(
      <RouterProvider router={router} />,
    );

    expect(await findByTestId('site-main')).toBeInTheDocument();
  });

  it('should toast', async () => {
    function MockComponent() {
      const setToast = useContext(ToastContext);

      useEffect(() => {
        setToast({
          header: 'Toast Header',
          body: 'Test Toast',
        });
      }, []);

      return <div />;
    }

    const router = createMemoryRouter([{
      element: <SiteLayout />,
      loader: () => ({
        id: 'testUserId',
        firstName: 'Test',
        permissions: [],
      }),
      children: [
        {
          path: '/test',
          element: <MockComponent />,
        },
      ],
    }], { initialEntries: ['/test'] });

    const { container, getByText, queryByText } = render(
      <RouterProvider router={router} />,
    );

    await waitFor(() => expect(getByText('Toast Header')).toBeInTheDocument());
    expect(getByText('Test Toast')).toBeInTheDocument();

    fireEvent.click(container.querySelector('.toast-header .btn-close'));

    await waitFor(() => expect(queryByText('Toast Header')).not.toBeInTheDocument());
  });
});
