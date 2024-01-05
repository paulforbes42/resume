import React, {
  useEffect,
} from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import {
  createMemoryRouter,
  RouterProvider,
  useOutletContext,
} from 'react-router-dom';

import SiteLayout from './site-layout';

describe('Site Layout', () => {
  it('should render', async () => {
    const router = createMemoryRouter([{
      path: '/test',
      element: <SiteLayout />,
    }], { initialEntries: ['/test'] });

    const { findByTestId } = render(
      <RouterProvider router={router} />,
    );

    expect(await findByTestId('site-header')).toBeInTheDocument();
    expect(await findByTestId('site-main')).toBeInTheDocument();
  });

  it('should toast', async () => {
    function MockComponent() {
      const { setToast } = useOutletContext();

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

    expect(getByText('Toast Header')).toBeInTheDocument();
    expect(getByText('Test Toast')).toBeInTheDocument();

    fireEvent.click(container.querySelector('.toast-header .btn-close'));

    await waitFor(() => expect(queryByText('Toast Header')).not.toBeInTheDocument());
  });
});
