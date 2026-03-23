import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Dashboard', icon: 'home', path: '/vendor/dashboard' },
  { label: 'Earnings', icon: 'payments', path: '/vendor/earnings' },
  { label: 'Services', icon: 'tune', path: '/vendor/services' },
  { label: 'Payouts', icon: 'account_balance', path: '/vendor/payouts' },
  { label: 'Profile', icon: 'person', path: '/vendor/profile' },
];

const VendorBottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 pb-4 pointer-events-none">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.2 }}
        className="pointer-events-auto flex items-center bg-surface/80 backdrop-blur-2xl px-3 py-3 rounded-[2rem] shadow-2xl shadow-black/20 border border-white/60 gap-1"
      >
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink key={item.path} to={item.path} className="relative flex flex-col items-center group">
              {isActive && (
                <motion.div 
                  layoutId="vendor-nav-pill"
                  className="absolute inset-0 vendor-gradient rounded-2xl"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <div className={`relative z-10 flex flex-col items-center gap-1 px-4 py-2.5 rounded-2xl transition-all duration-300 min-w-[60px]`}>
                <span 
                  className={`material-symbols-outlined text-[22px] transition-all duration-300 ${isActive ? 'text-white scale-110' : 'text-on-surface-variant group-hover:text-primary'}`}
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
                <AnimatePresence>
                  {isActive && (
                    <motion.span 
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      className="text-white font-black text-[9px] uppercase tracking-widest leading-none"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </NavLink>
          );
        })}
      </motion.div>
    </nav>
  );
};

export default VendorBottomNav;
