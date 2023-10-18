export default async (url, options = {}) => {
  const token = window.sessionStorage.getItem('a');
  const {
    method = 'GET',
    body,
    formData,
  } = options;

  let payload;
  let contentType;

  if (body) {
    contentType = 'application/json';
    payload = JSON.stringify(body);
  }

  if (formData) payload = formData;

  const headers = {
    ...options.headers,
    authorization: `Bearer: ${token}`,
  };

  if (contentType) headers['Content-Type'] = contentType;

  const res = await fetch(url, {
    method,
    headers,
    body: payload,
  });

  // Unauthorized
  if (res.status === 401) {
    window.location.href = '/login';
    return false;
  }

  // Successful Update and Server will provde no content
  if (res.status === 204) {
    return (new Date()).getTime();
  }

  return res.json();
};
