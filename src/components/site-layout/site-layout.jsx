import React from 'react';
import {
  Outlet,
  useLoaderData,
} from 'react-router-dom';

import PageHeader from '../page-header/page-header';

export default function SiteLayout() {
  const user = useLoaderData();

  return (
    <>
      <header data-testid="site-header">
        <PageHeader user={user} />
      </header>
      <main className="main" data-testid="site-main">
        <Outlet />
      </main>
    </>
  );
}
