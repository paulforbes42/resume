import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import {
  MemoryRouter,
  Routes,
  Route,
} from 'react-router-dom';

import PageHeader from './page-header';

describe('Page Header', () => {
  it('should render', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/test']}>
        <Routes>
          <Route
            path="/test"
            element={<PageHeader />}
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(getByText('Welcome!')).toBeInTheDocument();
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Login')).toBeInTheDocument();
  });
});
