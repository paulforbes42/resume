import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Overlay from './overlay';

describe('Overlay', () => {
  it('should render', () => {
    const { queryByText } = render(
      <Overlay title="test-title" isOpen />,
    );

    expect(queryByText('test-title')).toBeInTheDocument();
  });

  it('should only render when it is open', () => {
    const { queryByText } = render(
      <Overlay title="test-title" />,
    );

    expect(queryByText('test-title')).not.toBeInTheDocument();
  });

  it('should manage onClick handlers', () => {
    let called = false;
    const { queryByText } = render(
      <Overlay
        onClick={() => { called = true; }}
        title="test-title"
        isOpen
      />,
    );

    expect(queryByText('test-title')).toBeInTheDocument();
    fireEvent.click(queryByText('test-title'));

    expect(called).toBe(true);
  });
});
