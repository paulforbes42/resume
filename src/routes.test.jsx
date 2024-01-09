import { createBrowserRouter } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  createBrowserRouter: jest.fn(),
}));

jest.mock('./utils/request');

describe('routes', () => {
  it('should run loaders', async () => {
    jest.isolateModules(async () => {
      jest.requireActual('./routes');

      expect(createBrowserRouter).toHaveBeenCalled();
    });
  });
});
