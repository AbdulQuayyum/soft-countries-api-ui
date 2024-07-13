import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { DashboardHeader, Sidebar } from '../Components/Index';
import { UseAuth } from '../Contexts/Auth.Context';

const ProtectedLayout = () => {
  const { pathname } = useLocation();
  const { authState, setLastVisitedRoute } = UseAuth();
  const [showSidebar, setShowSidebar] = useState(false)

  useEffect(() => {
    if (!authState.token) {
      setLastVisitedRoute(pathname);
    }
  }, [authState.token, pathname, setLastVisitedRoute]);

  if (!authState.token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className='flex flex-row items-start w-full'>
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <main className=" main-container">
        <DashboardHeader setShowSidebar={setShowSidebar} />
        <Outlet />
      </main>
    </div>
  )
}

export default ProtectedLayout
