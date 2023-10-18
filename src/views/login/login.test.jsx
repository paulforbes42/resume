import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import {
  MemoryRouter,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';

import LoginView from './login';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Login View', () => {
  let mockFetch;
  let mockNavigate;

  beforeEach(() => {
    mockFetch = jest.fn();
    mockNavigate = jest.fn();

    useNavigate.mockImplementation(() => mockNavigate);

    global.fetch = mockFetch;
  });

  it('should login', async () => {
    const mockText = jest.fn();
    mockText.mockReturnValue(Promise.resolve('test-token'));

    mockFetch.mockReturnValue(Promise.resolve({
      status: 201,
      text: mockText,
    }));

    const { findByPlaceholderText, findByText } = render(
      <MemoryRouter initialEntries={['/test']}>
        <Routes>
          <Route
            path="/test"
            element={<LoginView />}
          />
        </Routes>
      </MemoryRouter>,
    );

    const email = await findByPlaceholderText('Email');
    expect(email).toBeInTheDocument();
    fireEvent.change(email, { target: { value: 'test@gmail.com' } });

    const password = await findByPlaceholderText('Password');
    expect(password).toBeInTheDocument();
    fireEvent.change(password, { target: { value: 'test123!' } });

    const submit = await findByText('Submit');
    expect(submit).toBeInTheDocument();
    fireEvent.click(submit);

    expect(mockFetch).toHaveBeenCalledWith('/api/user/auth', {
      method: 'POST',
      body: JSON.stringify({ email: 'test@gmail.com', pass: 'test123!' }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    await waitFor(() => {
      expect(mockText).toHaveBeenCalled();
    });
    expect(window.sessionStorage.setItem).toHaveBeenCalledWith('a', 'test-token');
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  it('should handle HTTP Errors', async () => {
    const mockText = jest.fn();
    mockFetch.mockReturnValue(Promise.resolve({
      status: 400,
      text: mockText,
    }));

    const { findByPlaceholderText, findByText } = render(
      <MemoryRouter initialEntries={['/test']}>
        <Routes>
          <Route
            path="/test"
            element={<LoginView />}
          />
        </Routes>
      </MemoryRouter>,
    );

    const email = await findByPlaceholderText('Email');
    fireEvent.change(email, { target: { value: 'test@gmail.com' } });

    const password = await findByPlaceholderText('Password');
    fireEvent.change(password, { target: { value: 'test123!' } });

    const submit = await findByText('Submit');
    fireEvent.click(submit);

    expect(await findByText('Invalid Login Information.')).toBeInTheDocument();
    expect(mockText).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('should not submit without email', async () => {
    const mockText = jest.fn();
    mockFetch.mockReturnValue(Promise.resolve({
      status: 400,
      text: mockText,
    }));

    const { findByPlaceholderText, findByText } = render(
      <MemoryRouter initialEntries={['/test']}>
        <Routes>
          <Route
            path="/test"
            element={<LoginView />}
          />
        </Routes>
      </MemoryRouter>,
    );

    const password = await findByPlaceholderText('Password');
    fireEvent.change(password, { target: { value: 'test123!' } });

    const submit = await findByText('Submit');
    fireEvent.click(submit);

    expect(mockFetch).not.toHaveBeenCalled();
    expect(mockText).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('should not submit without password', async () => {
    const mockText = jest.fn();
    mockFetch.mockReturnValue(Promise.resolve({
      status: 400,
      text: mockText,
    }));

    const { findByPlaceholderText, findByText } = render(
      <MemoryRouter initialEntries={['/test']}>
        <Routes>
          <Route
            path="/test"
            element={<LoginView />}
          />
        </Routes>
      </MemoryRouter>,
    );

    const email = await findByPlaceholderText('Email');
    fireEvent.change(email, { target: { value: 'test@gmail.com' } });

    const submit = await findByText('Submit');
    fireEvent.click(submit);

    expect(mockFetch).not.toHaveBeenCalled();
    expect(mockText).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('should handle failures', async () => {
    const mockText = jest.fn();

    mockFetch.mockReturnValue(() => Promise.reject(new Error()));

    const { findByPlaceholderText, findByText } = render(
      <MemoryRouter initialEntries={['/test']}>
        <Routes>
          <Route
            path="/test"
            element={<LoginView />}
          />
        </Routes>
      </MemoryRouter>,
    );

    const email = await findByPlaceholderText('Email');
    fireEvent.change(email, { target: { value: 'test@gmail.com' } });

    const password = await findByPlaceholderText('Password');
    fireEvent.change(password, { target: { value: 'test123!' } });

    const submit = await findByText('Submit');
    fireEvent.click(submit);

    expect(await findByText('Invalid Login Information.')).toBeInTheDocument();
    expect(mockText).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
