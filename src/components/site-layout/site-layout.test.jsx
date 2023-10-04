import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import {
  MemoryRouter,
  Routes,
  Route,
} from 'react-router-dom';

import SiteLayout from './site-layout';

describe('Site Layout', () => {
  it('should render', async () => {
    const { findByTestId } = render(
      <MemoryRouter initialEntries={['/test']}>
        <Routes>
          <Route
            path="/test"
            element={<SiteLayout />}
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(await findByTestId('site-header')).toBeInTheDocument();
    expect(await findByTestId('site-main')).toBeInTheDocument();
  });
});
