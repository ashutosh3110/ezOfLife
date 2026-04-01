import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import VendorHeader from '../components/VendorHeader';

const Dashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Available');
    const [isOnline, setIsOnline] = useState(true);

    const ordersData = {
        'Available': [
            { id: "EZ-8821", title: "Premium Wash & Fold", desc: "Estimated: 12.5 kg · Mixed Fabrics", dist: "0.8 km away", icon: "dry_cleaning" },
            { id: "EZ-8824", title: "Eco-Friendly Dry Clean", desc: "5 Items · 2 Suits, 3 Silk Shirts", dist: "2.4 km away", icon: "checkroom" },
            { id: "EZ-8825", title: "Ironing Only", desc: "15 Cotton Shirts · Starch Preferred", dist: "1.5 km away", icon: "iron" },
        ],
        'In Progress': [
            { id: "EZ-8815", title: "Heavy Duty Wash", desc: "8 kg · Bed Linens & Towels", dist: "Processing (45%)", icon: "local_laundry_service" },
            { id: "EZ-8816", title: "Delicate Silk Care", desc: "2 Items · Evening Gowns", dist: "Ironing Stage", icon: "opacity" },
        ],
        'Ready': [
            { id: "EZ-8810", title: "Quick Wash", desc: "3 kg · Gym Wear", dist: "Ready for Pickup", icon: "shopping_basket" },
            { id: "EZ-8808", title: "Blanket Sterilization", desc: "2 Large Blankets", dist: "Out for Delivery", icon: "sanitizer" },
        ]
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-background text-on-background min-h-screen pb-32 font-body"
        >
            <VendorHeader />

            {/* Mobile Availability Bar */}
            <div className="md:hidden bg-white border-b border-slate-100 px-6 py-2 flex justify-between items-center sticky top-[73px] z-40">
                <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`}></div>
                    <span className="text-[10px] font-black text-on-surface uppercase tracking-widest leading-none mt-0.5">Shop Status: {isOnline ? 'Active' : 'Resting'}</span>
                </div>
                <button 
                    onClick={() => setIsOnline(!isOnline)}
                    className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${isOnline ? 'bg-green-500 text-white border-green-500' : 'bg-slate-100 text-slate-400 border-slate-200'}`}
                >
                    {isOnline ? 'Go Offline' : 'Go Online'}
                </button>
            </div>

            <main className="max-w-xl mx-auto px-6 pt-8 space-y-10">
                {/* Compact Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Earnings Today</p>
                        <h2 className="text-2xl font-bold text-on-surface">₹1,420</h2>
                        <span className="text-[10px] text-green-500 font-bold uppercase mt-2 block">↗ 12%</span>
                    </div>
                    <div className="vendor-gradient p-5 rounded-3xl text-white shadow-lg shadow-primary/20">
                        <p className="text-[10px] font-bold uppercase tracking-widest mb-1">Active Orders</p>
                        <h2 className="text-2xl font-bold">8</h2>
                        <span className="text-[10px] font-bold uppercase mt-2 block">4 Ready</span>
                    </div>
                </div>

                {/* Workflow */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="text-sm font-bold text-on-background uppercase tracking-widest">Order Workflow</h3>
                        <div className="flex bg-slate-100 p-1 rounded-full border border-slate-200">
                            {['Available', 'In Progress', 'Ready'].map((tab) => (
                                <button 
                                    key={tab}
                                    className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant'}`}
                                >
                                    {tab === 'In Progress' ? 'Active' : tab === 'Ready' ? 'Done' : 'New'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <AnimatePresence mode="popLayout">
                            {ordersData[activeTab].map((order) => (
                                <motion.div 
                                    key={order.id}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    onClick={() => navigate(`/vendor/order/${order.id}`)}
                                    className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5 cursor-pointer hover:border-[#3D5AFE]/20 transition-all"
                                >
                                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                                        <span className="material-symbols-outlined text-[24px]">{order.icon}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-0.5">
                                            <h4 className="text-sm font-bold text-on-surface truncate">{order.title}</h4>
                                            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">#{order.id}</span>
                                        </div>
                                        <p className="text-xs text-on-surface-variant font-medium mb-3 truncate">{order.desc}</p>
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[14px] text-outline-variant">location_on</span>
                                            <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">{order.dist}</span>
                                        </div>
                                    </div>
                                    <span className="material-symbols-outlined text-outline-variant/30 text-[18px]">chevron_right</span>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </section>
            </main>
        </motion.div>
    );
};

export default Dashboard;
