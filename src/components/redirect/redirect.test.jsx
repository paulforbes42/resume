import React from 'react';
import { render } from '@testing-library/react';
import {
  MemoryRouter,
  useNavigate,
} from 'react-router-dom';

import Redirect from './redirect';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Redirect', () => {
  let mockNavigate;

  beforeEach(() => {
    mockNavigate = jest.fn();
    useNavigate.mockImplementation(() => mockNavigate);
  });

  it('should render', async () => {
    render(
      <MemoryRouter>
        <Redirect to="/login" />
      </MemoryRouter>,
    );

    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});
