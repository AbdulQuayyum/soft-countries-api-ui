import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { UseAuth } from '../Contexts/Auth.Context';

const ProtectedLayout = () => {
  const { authState, setLastVisitedRoute } = UseAuth();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!authState.token) {
      setLastVisitedRoute(pathname);
    }
  }, [authState.token, pathname, setLastVisitedRoute]);

  if (!authState.token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedLayout
