import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { label: 'Home', icon: 'home', path: '/user/home' },
    { label: 'Orders', icon: 'local_laundry_service', path: '/user/orders' },
    { label: 'Profile', icon: 'person', path: '/user/profile' },
    { label: 'More', icon: 'menu', path: '/user/more' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none pb-8 flex justify-center">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        // Removed exit animation to avoid flashes during layout transitions
        className="bg-surface/90 backdrop-blur-2xl px-3 py-2 rounded-full shadow-[0_20px_40px_rgba(47,50,58,0.12)] pointer-events-auto flex justify-around items-center w-[90%] max-w-md border border-outline-variant/10"
      >
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <motion.button 
              key={item.path}
              id={`nav-${item.label.toLowerCase()}`}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(item.path)}
              className={`relative flex flex-col items-center justify-center rounded-full px-5 py-2.5 transition-colors duration-300 ${
                isActive ? 'text-on-primary' : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="navBubble"
                  className="absolute inset-0 bg-primary rounded-full shadow-lg shadow-primary/20"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10 material-symbols-outlined text-[22px]" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                {item.icon}
              </span>
              <span className="relative z-10 font-headline font-bold text-[9px] mt-1 uppercase tracking-tighter">{item.label}</span>
            </motion.button>
          );
        })}
      </motion.div>
    </nav>
  );
};

export default BottomNav;
