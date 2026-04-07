import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const RiderBottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const tabs = [
        { icon: 'task_alt', label: 'Tasks', path: '/rider/dashboard' },
        { icon: 'account_balance_wallet', label: 'Wallet', path: '/rider/wallet' },
        { icon: 'person', label: 'Profile', path: '/rider/profile' }
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 h-24 bg-white border-t border-slate-100 flex items-center justify-around px-6 pb-4 z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
            {tabs.map((tab) => {
                const isActive = location.pathname === tab.path;
                return (
                    <motion.button 
                        key={tab.path}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => navigate(tab.path)}
                        className="flex flex-col items-center gap-1.5"
                    >
                        <div className={`w-12 h-12 rounded-[1.25rem] flex items-center justify-center transition-all ${isActive ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'text-slate-400 bg-slate-50'}`}>
                            <span className="material-symbols-outlined text-xl">{tab.icon}</span>
                        </div>
                        <span className={`text-[9px] font-black uppercase tracking-widest ${isActive ? 'text-emerald-700' : 'text-slate-300'}`}>
                            {tab.label}
                        </span>
                    </motion.button>
                );
            })}
        </nav>
    );
};

const RiderLayout = () => {
    const location = useLocation();
    
    // Hide nav on specific pages
    const showNav = !location.pathname.includes('/rider/task/') && !location.pathname.includes('/rider/auth') && !location.pathname.includes('/rider/otp');

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <main className="flex-1 w-full relative">
                <Outlet />
            </main>
            {showNav && <RiderBottomNav />}
        </div>
    );
};

export default RiderLayout;
