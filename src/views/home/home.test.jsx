import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import HomeView from './home';

describe('Home Page', () => {
  it('should render', async () => {
    const { findByText } = render(<HomeView />);

    expect(await findByText('Hello, World!')).toBeInTheDocument();
  });
});
