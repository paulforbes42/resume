import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import routes from './routes';
import './main.scss';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <RouterProvider router={routes} />,
);
