import { act } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('./main.scss', () => {});

describe('index.jsx', () => {
  let el;
  beforeEach(() => {
    el = document.createElement('div');
    el.setAttribute('id', 'root');
    document.body.appendChild(el);
  });

  it('should render', async () => {
    await act(async () => {
      await import('./index');
    });
    expect(el.children.length).toBeTruthy();
  });
});
