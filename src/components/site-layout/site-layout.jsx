import React, {
  useEffect,
  useState,
} from 'react';
import {
  Outlet,
  useLoaderData,
} from 'react-router-dom';

import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';

import PermissionContext from '../../context/permission';
import ToastContext from '../../context/toast';
import PageHeader from '../page-header/page-header';

export default function SiteLayout() {
  const user = useLoaderData();
  const [toast, setToast] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setShowToast(!!toast);
  }, [toast]);

  return (
    <PermissionContext.Provider value={user.permissions}>
      <ToastContext.Provider value={setToast}>
        <header data-testid="site-header">
          <PageHeader user={user} />
        </header>
        <main className="main mb-4" data-testid="site-main">
          <Outlet />
        </main>
        <ToastContainer
          position="top-end"
          className="me-3 mt-3 position-fixed"
        >
          <Toast
            show={showToast}
            onClose={() => setToast(null)}
            delay={4000}
            bg={toast?.bg}
            autohide
          >
            <Toast.Header closeButton>
              <strong className="me-auto">{toast?.header}</strong>
            </Toast.Header>
            <Toast.Body>{toast?.body}</Toast.Body>
          </Toast>

        </ToastContainer>
      </ToastContext.Provider>
    </PermissionContext.Provider>
  );
}
