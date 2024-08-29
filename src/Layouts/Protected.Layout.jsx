import { useEffect, useState, useCallback } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { TbLoader3 } from "react-icons/tb";

import { DashboardHeader, Sidebar } from '../Components/Index';
import { UseAuth } from '../Contexts/Auth.Context';
import { GetUserInfo } from '../APIs/user.api';

const ProtectedLayout = () => {
  const { pathname } = useLocation();
  const { authState, setLastVisitedRoute } = UseAuth();
  const [showSidebar, setShowSidebar] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchTrigger, setFetchTrigger] = useState(false);

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

  const fetchUserInfo = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await GetUserInfo(authState.user?.username);
      const userData = response.data.data;
      // console.log(userData);
      setUserInfo(userData);
    } catch (error) {
      setError(error.message || 'An error occurred while fetching user information.');
    }
    setLoading(false);
  }, [authState.user?.username]);

  useEffect(() => {
    if (authState.token && authState.user) {
      fetchUserInfo();
    }
  }, [authState.token, authState.user, fetchTrigger, fetchUserInfo]);

  const forceRefetch = () => {
    setFetchTrigger(prev => !prev);
  };

  if (!authState.token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex items-center justify-center w-full">
      <div className="layout">
        <div className={`flex w-full h-screen overflow-hidden ${showSidebar ? " gap-x-8" : ""}`}>
          <div className='flex-shrink-0'>
            <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} isAdmin={userInfo?.isAdmin} />
          </div>
          <div className="flex flex-col items-center flex-1 overflow-hidden">
            <DashboardHeader setShowSidebar={setShowSidebar} user={userInfo} forceRefetch={forceRefetch} />
            <main className="flex-1 overflow-auto main-container">
              {loading && <div className="container flex items-center justify-center p-10"><TbLoader3 size={24} className="animate-spin" /> </div>}
              {error && <div className="container flex items-center justify-center p-10">{error}</div>}
              {userInfo && (
                <Outlet context={{ userInfo, forceRefetch }} />
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtectedLayout;
