import request from './request';

describe('Request utility', () => {
  let mockResponse;
  let mockHref;

  beforeEach(() => {
    mockResponse = {
      status: 200,
      json: jest.fn(),
    };

    mockHref = '';

    window.fetch = jest.fn();
    window.fetch.mockImplementation(() => Promise.resolve(mockResponse));

    window.sessionStorage.getItem.mockImplementation(() => 'test-key');
    delete window.location;
    window.location = {
      set href(url) {
        mockHref = url;
      },
    };
  });

  it('should make a request', async () => {
    mockResponse.json.mockImplementation(() => Promise.resolve({
      test: 1,
    }));

    const rv = await request('test-url');
    expect(window.fetch).toHaveBeenCalledWith('test-url', {
      body: undefined,
      headers: {
        authorization: 'Bearer: test-key',
      },
      method: 'GET',
    });
    expect(rv.test).toBe(1);
  });

  it('should handle json request body data', async () => {
    mockResponse.json.mockImplementation(() => Promise.resolve({
      test: 1,
    }));

    const rv = await request('test-url', {
      body: {
        test: 1,
      },
    });
    expect(window.fetch).toHaveBeenCalledWith('test-url', {
      body: '{"test":1}',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer: test-key',
      },
      method: 'GET',
    });
    expect(rv.test).toBe(1);
  });

  it('should navigate to login on 401', async () => {
    mockResponse.status = 401;
    await request('test-url');
    expect(mockHref).toBe('/login');
  });

  it('should handle 204 staus and return an integer', async () => {
    mockResponse.status = 204;
    const rv = await request('test-url');

    expect(mockResponse.json).not.toHaveBeenCalled();
    expect(typeof rv).toBe('number');
  });

  it('should handle form data', async () => {
    await request('test-url', {
      formData: {
        test: 1,
      },
    });
    expect(window.fetch).toHaveBeenCalledWith('test-url', {
      method: 'GET',
      body: {
        test: 1,
      },
      headers: {
        authorization: 'Bearer: test-key',
      },
    });
  });
});
