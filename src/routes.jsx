import React from 'react';
import {
  createBrowserRouter,
} from 'react-router-dom';

import request from './utils/request';

import ErrorElement from './components/error-element/error-element';
import Redirect from './components/redirect/redirect';

import AdminUsersView from './views/admin/users';

import SiteLayout from './components/site-layout/site-layout';
import HomeView from './views/home/home';
import LoginView from './views/login/login';

const router = createBrowserRouter([
  {
    path: '/login',
    errorElement: <Redirect to="/login" />,
    element: <LoginView />,
  },
  {
    element: <SiteLayout />,
    errorElement: <ErrorElement />,
    loader: () => request('/api/user'),
    children: [
      {
        path: '/',
        element: <HomeView />,
      },
      {
        path: '/admin/users',
        element: <AdminUsersView />,
        loader: () => request('/api/admin/user'),
      },
    ],
  },
]);

export default router;
