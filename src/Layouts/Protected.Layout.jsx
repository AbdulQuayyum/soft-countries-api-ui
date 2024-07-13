import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { TbLoader3 } from "react-icons/tb";

import { DashboardHeader, Sidebar } from '../Components/Index';
import { UseAuth } from '../Contexts/Auth.Context';
import { GetUserInfo } from '../APIs/user.api';

const ProtectedLayout = () => {
  const { pathname } = useLocation();
  const { authState, setLastVisitedRoute } = UseAuth();
  const [showSidebar, setShowSidebar] = useState(true)
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authState.token) {
      setLastVisitedRoute(pathname);
    }
  }, [authState.token, pathname, setLastVisitedRoute]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1024) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await GetUserInfo(authState.user.username);
        const userData = response.data.data;
        console.log(userData);

        setUserInfo(userData);
      } catch (error) {
        setError(error.message || 'An error occurred while fetching user information.');
      }
      setLoading(false);
    };

    if (authState.token && authState.user) {
      fetchUserInfo();
    }
  }, [authState.token, authState.user]);

  if (!authState.token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className='flex flex-row items-start w-full'>
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <main className="main-container">
        <DashboardHeader setShowSidebar={setShowSidebar} user={userInfo} />
        {loading && <div className="container flex items-center justify-center p-10"><TbLoader3 size={24} className=" animate-spin" /> </div>}
        {error && <div className="container flex items-center justify-center p-10">{error}</div>}
        {userInfo && (
          <Outlet context={{ userInfo }} />
        )}
      </main>
    </div>
  );
};

export default ProtectedLayout;