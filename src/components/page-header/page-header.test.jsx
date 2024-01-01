import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import {
  MemoryRouter,
  Routes,
  Route,
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
    expect(getByText('Logout')).toBeInTheDocument();
  });

  it('should logout', async () => {
    const mockRemoveItem = jest.spyOn(window.sessionStorage, 'removeItem');
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

    fireEvent.click(getByText('Logout'));

    expect(mockRemoveItem).toHaveBeenCalledWith('a');
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});
