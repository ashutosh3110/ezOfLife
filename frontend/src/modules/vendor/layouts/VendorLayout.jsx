import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import VendorBottomNav from '../components/VendorBottomNav';

const VendorLayout = () => {
  const location = useLocation();
  // Routes that shouldn't show the bottom nav
  const noNavPaths = [
    '/vendor/splash',
    '/vendor/auth',
    '/vendor/otp',
    '/vendor/register', 
    '/vendor/upload-documents', 
    '/vendor/approval-pending',
    '/vendor/order/',
    '/vendor/rider-verification/'
  ];
  
  const showNav = !noNavPaths.some(path => location.pathname.startsWith(path));

  // Animation variants for page transitions
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 15,
      scale: 0.99
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.12
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.4,
        ease: [0.33, 1, 0.68, 1]
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <AnimatePresence mode="wait">
        <motion.main 
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          className="flex-1 w-full"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      
      {showNav && <VendorBottomNav />}
    </div>
  );
};

export default VendorLayout;
