import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import ConfirmationModal from './confirmation-modal';

describe('Confirmation Modal', () => {
  it('should render', () => {
    const { getByText } = render(
      <ConfirmationModal
        show
        onSubmit={jest.fn()}
        onHide={jest.fn()}
      />,
    );

    expect(getByText('Confirm Action')).toBeInTheDocument();
    expect(getByText('Confirm')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
    expect(getByText('Are you sure you want to proceed?')).toBeInTheDocument();
  });

  it('should cancel', () => {
    const onSubmit = jest.fn();
    const onHide = jest.fn();

    const { getByText } = render(
      <ConfirmationModal
        show
        onSubmit={onSubmit}
        onHide={onHide}
      />,
    );

    fireEvent.click(getByText('Cancel'));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(onHide).toHaveBeenCalled();
  });

  it('should submit', async () => {
    const onSubmit = jest.fn();
    const onHide = jest.fn();

    const { getByText } = render(
      <ConfirmationModal
        show
        onSubmit={onSubmit}
        onHide={onHide}
      />,
    );

    fireEvent.click(getByText('Confirm'));

    expect(onSubmit).toHaveBeenCalled();
  });

  it('should allow custom title and body', () => {
    const { getByText } = render(
      <ConfirmationModal
        show
        onSubmit={jest.fn()}
        onHide={jest.fn()}
        title="test title"
        body="test body"
        buttonText="test button text"
      />,
    );

    expect(getByText('test title')).toBeInTheDocument();
    expect(getByText('test body')).toBeInTheDocument();
    expect(getByText('test button text')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });

  it('should be hidden by default', () => {
    const { queryByText } = render(<ConfirmationModal onSubmit={jest.fn()} onHide={jest.fn()} />);

    expect(queryByText('Confirm Action')).not.toBeInTheDocument();
    expect(queryByText('Confirm')).not.toBeInTheDocument();
  });
});
