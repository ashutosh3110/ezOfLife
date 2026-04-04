import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import UserHeader from '../components/UserHeader';
import BottomNav from '../components/BottomNav';

const UserLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname.replace(/\/$/, '') || '/user';
  
  const hideHeaderPaths = [
    '/user/auth', 
    '/user/otp', 
    '/user/splash', 
    '/user/tracking', 
    '/user/success', 
    '/user/notifications', 
    '/user/profile',
    '/user/profile/edit', 
    '/user/profile/addresses', 
    '/user/services',
    '/user/cart',
    '/user/confirmation',
    '/user/chat',
    '/user/partnerships',
    '/user/advertise',
    '/user/faq',
    '/user/terms',
    '/user/careers',
    '/user/review',
    '/user/support',
    '/user/payment',
    '/user/success-feedback',
    '/user/verification'
  ];
  const hideNavPaths = [
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
    '/user/services',
    '/user/chat',
    '/user/cart',
    '/user/partnerships',
    '/user/advertise',
    '/user/faq',
    '/user/terms',
    '/user/careers',
    '/user/review',
    '/user/support'
  ];

  // Special handle for Splash which is exactly '/user'
  const isSplash = currentPath === '/user';
  const showHeader = !isSplash && !hideHeaderPaths.some(path => currentPath.startsWith(path));
  const showNav = !isSplash && !hideNavPaths.some(path => currentPath.startsWith(path));

  // Note: Some pages in currently have their own Header/Nav. 
  // We'll gradually move them to this layout or keep them if they are special.
  // Actually, let's keep it simple for now and just refactor the BottomNav to be reactive.
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {showHeader && <UserHeader />}
      <div className="flex-1">
        <Outlet />
      </div>
      {showNav && <BottomNav />}
    </div>
  );
};

export default UserLayout;
