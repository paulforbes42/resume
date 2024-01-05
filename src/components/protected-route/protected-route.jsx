import React, {
  useContext,
} from 'react';

import {
  Outlet,
  Navigate,
} from 'react-router-dom';

import PermissionContext from '../../context/permission';

export default function ProtectedRoute() {
  const userPermissions = useContext(PermissionContext);

  if (!userPermissions || !userPermissions.length) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
