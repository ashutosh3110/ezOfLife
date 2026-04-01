import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Home', icon: 'home', path: '/vendor/dashboard' },
  { label: 'Sales', icon: 'payments', path: '/vendor/earnings' },
  { label: 'Menu', icon: 'tune', path: '/vendor/services' },
  { label: 'Bank', icon: 'account_balance', path: '/vendor/payouts' },
  { label: 'Profile', icon: 'person', path: '/vendor/profile' },
];

const VendorBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const hideRoutes = [
    '/vendor/splash', 
    '/vendor/auth', 
    '/vendor/otp', 
    '/vendor/register', 
    '/vendor/upload-documents', 
    '/vendor/approval-pending'
  ];

  if (hideRoutes.some(route => location.pathname === route)) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[100] pb-8 pt-4 px-6 md:hidden flex justify-center pointer-events-none">
      <motion.div 
        layout
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 40 }}
        className="bg-white/95 backdrop-blur-2xl px-3 py-2 rounded-full shadow-[0_32px_64px_rgba(0,0,0,0.12)] pointer-events-auto flex justify-around items-center w-[95%] max-w-md border border-black/5 gap-1"
      >
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button 
              key={item.path} 
              id={`vendor-nav-${item.label.toLowerCase()}`}
              onClick={() => navigate(item.path)}
              className={`relative flex flex-col items-center justify-center rounded-full px-4 py-2.5 transition-colors duration-300 focus:outline-none touch-none no-underline ${
                isActive ? 'text-on-primary' : 'text-on-surface-variant hover:bg-surface-container'
              }`}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {isActive && (
                <motion.div 
                  layoutId="vendorNavBubble"
                  className="absolute inset-0 bg-primary rounded-full shadow-lg shadow-primary/20"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              
              <div className="relative z-10 flex flex-col items-center gap-0.5">
                <span 
                  className="material-symbols-outlined text-[22px]"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
                
                <span className="font-headline font-bold text-[9px] uppercase tracking-tighter">
                  {item.label}
                </span>
              </div>
            </button>
          );
        })}
      </motion.div>
    </nav>
  );
};

export default VendorBottomNav;
