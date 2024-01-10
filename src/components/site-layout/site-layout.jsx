import React from 'react';
import {
  Outlet,
} from 'react-router-dom';

export default function SiteLayout() {
  return (
    <main className="main" data-testid="site-main">
      <Outlet />
    </main>
  );
}
