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

  // Successful Update and Server will provde no content
  if (res.status === 204) {
    return (new Date()).getTime();
  }

  // Throw other error reesponses
  if (res.status >= 400) {
    throw res;
  }

  return res.json();
};
