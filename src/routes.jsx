import React from 'react';
import {
  createBrowserRouter,
} from 'react-router-dom';

import SiteLayout from './components/site-layout/site-layout';
import HomeView from './views/home/home';
import LoginView from './views/login/login';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginView />,
  },
  {
    element: <SiteLayout />,
    children: [
      {
        path: '/',
        element: <HomeView />,
      },

    ],
  },
]);

export default router;
