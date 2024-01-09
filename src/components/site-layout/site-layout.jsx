import React, {
  useEffect,
  useState,
} from 'react';
import {
  Outlet,
} from 'react-router-dom';

import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';

import ToastContext from '../../context/toast';

export default function SiteLayout() {
  const [toast, setToast] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setShowToast(!!toast);
  }, [toast]);

  return (
    <ToastContext.Provider value={setToast}>
      <main className="main" data-testid="site-main">
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
  );
}
