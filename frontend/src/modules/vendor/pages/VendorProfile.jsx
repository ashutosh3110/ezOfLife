import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import VendorHeader from '../components/VendorHeader';

const VendorProfile = () => {
    const navigate = useNavigate();

    const menuItems = [
        { icon: 'edit', label: 'Edit Profile', sub: 'Update shop name and contact', path: null },
        { icon: 'location_on', label: 'Shop Address', sub: 'Manage pickup location', path: '/vendor/register' },
        { icon: 'account_balance', label: 'Bank & Payouts', sub: 'Manage settlements', path: '/vendor/payouts' },
        { icon: 'receipt_long', label: 'Order History', sub: 'View completed orders', path: '/vendor/order-history' },
        { icon: 'tune', label: 'Services & Pricing', sub: 'Configure your offerings', path: '/vendor/services' },
        { icon: 'notifications', label: 'Notifications', sub: 'Manage alerts', path: '/vendor/notifications' },
        { icon: 'help_outline', label: 'Help & Support', sub: 'FAQ and contact us', path: null },
    ];

    return (
        <div className="bg-surface text-on-surface min-h-screen pb-32">
            <VendorHeader />

            <motion.main 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-2xl mx-auto px-6 py-8"
            >
                {/* Profile Hero */}
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-surface-container-low rounded-[2rem] p-10 mb-8 border border-outline-variant/10 shadow-sm relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 vendor-gradient opacity-10 blur-3xl -mr-20 -mt-20"></div>
                    
                    <div className="relative z-10 flex items-center gap-8">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-[1.5rem] bg-primary-container overflow-hidden shadow-xl border-4 border-white">
                                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAT1G7gcHTDKYAyUsrelXEMf2w6RQyBCMwtQmyqi-a7ZPOQcRRYhe1gqMBSPUsXY8Ru16zqZWc8aMj-kve41JSGpk8PBMQSmPvwiBPyQnE-KlBH_j2zy2u_kqX_CmMYKy2-bOYW3G-i3PiCbE759VmmQXpJyL_cmmWYbnIEV-rZR8sjSexO93iameBgS7Rd19y8CQTrD4Ke46jtuCZrbKo6LTv7KtyX4330_FAPFGYdMldUrndR32fDYqOWnPk42gI1Zxydi6FSoas" alt="Vendor" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 vendor-gradient w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                                <span className="material-symbols-outlined text-white text-[16px]">verified</span>
                            </div>
                        </div>
                        <div className="flex-1">
                            <h2 className="font-headline font-black text-2xl tracking-tighter text-on-surface mb-1">Pristine Cleaners</h2>
                            <p className="text-on-surface-variant font-medium text-sm mb-3">+91 98765 43210</p>
                            <div className="flex items-center gap-3">
                                <div className="flex text-amber-500">
                                    {[...Array(5)].map((_, i) => <span key={i} className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>)}
                                </div>
                                <span className="text-xs font-black text-on-surface-variant">4.9 · 214 orders</span>
                            </div>
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div className="relative z-10 grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-outline-variant/10">
                        {[
                            { label: 'Orders', value: '214' },
                            { label: 'Earnings', value: '₹1.2L' },
                            { label: 'Rating', value: '4.9★' },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <p className="font-headline font-black text-2xl tracking-tighter text-primary">{stat.value}</p>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Menu Items */}
                <div className="space-y-3">
                    {menuItems.map((item, i) => (
                        <motion.button 
                            key={item.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + i * 0.05 }}
                            whileHover={{ x: 6 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => item.path && navigate(item.path)}
                            className="w-full bg-surface-container-low hover:bg-white p-6 rounded-2xl flex items-center gap-5 border border-outline-variant/5 shadow-sm transition-all group text-left"
                        >
                            <div className="w-12 h-12 bg-primary-container/20 rounded-xl flex items-center justify-center text-primary group-hover:vendor-gradient group-hover:text-white transition-all">
                                <span className="material-symbols-outlined">{item.icon}</span>
                            </div>
                            <div className="flex-1">
                                <p className="font-headline font-bold text-on-surface">{item.label}</p>
                                <p className="text-xs text-on-surface-variant font-medium">{item.sub}</p>
                            </div>
                            <span className="material-symbols-outlined text-on-surface-variant/40 group-hover:text-primary transition-colors">chevron_right</span>
                        </motion.button>
                    ))}
                </div>

                {/* Logout */}
                <motion.button 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/vendor/auth')}
                    className="w-full mt-6 p-6 rounded-2xl flex items-center justify-center gap-3 border border-red-200/50 text-red-500 hover:bg-red-50 transition-all font-headline font-bold"
                >
                    <span className="material-symbols-outlined">logout</span>
                    Sign Out
                </motion.button>
            </motion.main>
        </div>
    );
};

export default VendorProfile;
