import React from 'react';
import { Outlet } from 'react-router-dom';

import PageHeader from '../page-header/page-header';

export default function SiteLayout() {
  return (
    <>
      <header data-testid="site-header">
        <PageHeader />
      </header>
      <main className="main" data-testid="site-main">
        <Outlet />
      </main>
    </>
  );
}
