import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import UserHeader from '../components/UserHeader';
import BottomNav from '../components/BottomNav';

const UserLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname.replace(/\/$/, '') || '/user';
  
  const hideHeaderPaths = ['/user', '/user/auth', '/user/otp', '/user/splash', '/user/tracking', '/user/success', '/user/notifications', '/user/profile/edit', '/user/profile/addresses', '/user/services'];
  const hideNavPaths = [
    '/user', 
    '/user/auth', 
    '/user/otp',
    '/user/splash', 
    '/user/success', 
    '/user/confirmation', 
    '/user/tracking', 
    '/user/verification', 
    '/user/payment', 
    '/user/success-feedback',
    '/user/notifications',
    '/user/profile/edit',
    '/user/profile/addresses',
    '/user/services'
  ];

  const showHeader = !hideHeaderPaths.includes(currentPath);
  const showNav = !hideNavPaths.includes(currentPath);

  // Note: Some pages in currently have their own Header/Nav. 
  // We'll gradually move them to this layout or keep them if they are special.
  // Actually, let's keep it simple for now and just refactor the BottomNav to be reactive.
  
  return (
    <div className="flex flex-col min-h-screen">
      {showHeader && <UserHeader />}
      <div className="flex-1">
        <Outlet />
      </div>
      {showNav && <BottomNav />}
    </div>
  );
};

export default UserLayout;
