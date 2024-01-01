import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import {
  createMemoryRouter,
  RouterProvider,
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
});
