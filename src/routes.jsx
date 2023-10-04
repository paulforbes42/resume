import React from 'react';
import {
  createBrowserRouter,
} from 'react-router-dom';

import SiteLayout from './components/site-layout/site-layout';
import HomeView from './views/home/home';
import LoginView from './views/login/login';

const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      {
        path: '/',
        element: <HomeView />,
      },
      {
        path: '/login',
        element: <LoginView />,
      },
    ],
  },
]);

export default router;
