import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { enableFetchMocks } from 'jest-fetch-mock';

import {
  createMemoryRouter,
  RouterProvider,
} from 'react-router-dom';

import ActiveForm from './active-form';

enableFetchMocks();

describe('Active Form', () => {
  it('should render', () => {
    const fields = [
      {
        type: 'text',
        placeholder: 'Test Field',
        name: 'test',
      },
    ];

    const router = createMemoryRouter([{
      path: '/test',
      element: (<ActiveForm
        title="FormTest"
        fields={fields}
        submitText="Test Submit"
        onSubmit={jest.fn()}
      />),
    }], { initialEntries: ['/test'] });

    const { getByText, getByPlaceholderText } = render(
      <RouterProvider router={router} />,
    );

    expect(getByText('FormTest')).toBeInTheDocument();
    expect(getByPlaceholderText('Test Field')).toBeInTheDocument();
    expect(getByText('Test Submit')).toBeInTheDocument();
  });

  it('should display a form error', () => {
    const fields = [
      {
        type: 'text',
        placeholder: 'Test Field',
        name: 'test',
      },
    ];

    const router = createMemoryRouter([{
      path: '/test',
      element: (<ActiveForm
        title="FormTest"
        formError="FormError"
        fields={fields}
        onSubmit={jest.fn()}
      />),
    }], { initialEntries: ['/test'] });

    const { getByText } = render(
      <RouterProvider router={router} />,
    );

    expect(getByText('FormError')).toBeInTheDocument();
  });

  it('should focus the first field', () => {
    const fields = [
      {
        type: 'text',
        placeholder: 'Test Field',
        name: 'test',
      },
    ];

    const router = createMemoryRouter([{
      path: '/test',
      element: (<ActiveForm
        focus
        title="FormTest"
        fields={fields}
        onSubmit={jest.fn()}
      />),
    }], { initialEntries: ['/test'] });

    const { getByPlaceholderText } = render(
      <RouterProvider router={router} />,
    );

    expect(document.activeElement === getByPlaceholderText('Test Field')).toBe(true);
  });

  it('should submit', () => {
    const onSubmit = jest.fn();
    const fields = [
      {
        placeholder: 'Test Field',
        name: 'test',
        required: true,
      },
    ];

    const router = createMemoryRouter([{
      path: '/test',
      element: (<ActiveForm
        title="FormTest"
        fields={fields}
        onSubmit={onSubmit}
      />),
    }], { initialEntries: ['/test'] });

    const { getByText, getByPlaceholderText } = render(
      <RouterProvider router={router} />,
    );

    const el = getByPlaceholderText('Test Field');
    expect(el).toBeInTheDocument();
    fireEvent.change(el, { target: { value: 'value' } });

    fireEvent.click(getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith({ test: 'value' });
  });

  it('should exclude fields', () => {
    const onSubmit = jest.fn();
    const fields = [
      {
        placeholder: 'Test Field',
        name: 'test',
        required: true,
        invalid: 'C',
      },
      {
        placeholder: 'Exclude',
        name: 'test2',
        exclude: true,
      },
    ];

    const router = createMemoryRouter([{
      path: '/test',
      element: (<ActiveForm
        title="FormTest"
        fields={fields}
        onSubmit={onSubmit}
      />),
    }], { initialEntries: ['/test'] });

    const { getByText, getByPlaceholderText } = render(
      <RouterProvider router={router} />,
    );

    const el = getByPlaceholderText('Test Field');
    expect(el).toBeInTheDocument();
    fireEvent.change(getByPlaceholderText('Test Field'), { target: { value: 'value' } });
    fireEvent.change(getByPlaceholderText('Exclude'), { target: { value: 'value' } });
    fireEvent.click(getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith({ test: 'value' });
  });

  it('should display a form with floating labels', () => {
    const fields = [
      {
        placeholder: 'Test Field',
        name: 'test',
        required: true,
        invalid: 'B',
      },
      {
        placeholder: 'Exclude',
        name: 'test2',
        exclude: true,
      },
    ];

    const router = createMemoryRouter([{
      path: '/test',
      element: (<ActiveForm
        floatingLabels
        title="FormTest"
        fields={fields}
      />),
    }], { initialEntries: ['/test'] });

    const { getByPlaceholderText } = render(
      <RouterProvider router={router} />,
    );

    const el = getByPlaceholderText('Test Field');
    expect(el).toBeInTheDocument();
    fireEvent.change(el, { target: { value: 'test' } });
  });

  it('should block navigation', () => {
    const fields = [
      {
        placeholder: 'Test Field',
        name: 'test',
        required: true,
        invalid: 'A',
      },
    ];

    const router = createMemoryRouter([{
      path: '/',
      element: (<div />),
    },
    {
      path: '/test',
      element: (<ActiveForm
        preventDirtyNavigation
        floatingLabels
        title="FormTest"
        fields={fields}
      />),
    }], { initialEntries: ['/', '/test'] });

    const {
      getByPlaceholderText,
      getByText,
      queryByPlaceholderText,
    } = render(
      <RouterProvider router={router} />,
    );

    fireEvent.change(getByPlaceholderText('Test Field'), { target: { value: 'value' } });

    act(() => {
      router.navigate(-1);
    });

    expect(getByText('You have unsaved changes. Are you sure you want to leave this page?')).toBeInTheDocument();
    fireEvent.click(getByText('Cancel'));
    expect(queryByPlaceholderText('Test Field')).toBeInTheDocument();

    act(() => {
      router.navigate(-1);
    });

    fireEvent.click(getByText('Continue'));

    expect(queryByPlaceholderText('Test Field')).not.toBeInTheDocument();
  });
});
