import React from 'react';
import {
  isRouteErrorResponse,
  useRouteError,
} from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';

import Redirect from '../redirect/redirect';

export default function ErrorElement() {
  const error = useRouteError();
  if (isRouteErrorResponse(error) && error.status === 401) {
    return <Redirect to="/login" />;
  }

  return (
    <Alert variant="danger">
      <Alert.Heading>Something went wrong.</Alert.Heading>
      <div>{error.toString()}</div>
    </Alert>
  );
}
