import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import VendorHeader from '../components/VendorHeader';

const VendorOrderHistory = () => {
    const navigate = useNavigate();
    const [tab, setTab] = useState('active');

    const activeOrders = [
        { id: '#EZ-8821', status: 'Processing', date: 'Mar 23, 2026', price: 498, progress: 50 },
        { id: '#EZ-8824', status: 'Ready', date: 'Mar 23, 2026', price: 650, progress: 80 },
    ];

    const completedOrders = [
        { id: '#EZ-8810', status: 'Delivered', date: 'Mar 21, 2026', price: 375, desc: '2x Wash & Fold, 1x Eco Dry Clean' },
        { id: '#EZ-8799', status: 'Delivered', date: 'Mar 18, 2026', price: 850, desc: 'Heavy Duty Wash, 4 kg · Starch on Cotton' },
        { id: '#EZ-8780', status: 'Delivered', date: 'Mar 14, 2026', price: 210, desc: 'Express Ironing — 8 shirts' },
    ];

    return (
        <div className="bg-surface text-on-surface min-h-screen pb-32">
            <VendorHeader title="Order History" showBack={true} />

            <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto px-6 py-8">
                {/* Tabs */}
                <div className="flex gap-1 p-1.5 bg-white rounded-full w-fit shadow-sm border border-outline-variant/5 mb-10">
                    {[{ key: 'active', label: 'Active' }, { key: 'completed', label: 'Completed' }].map(({ key, label }) => (
                        <motion.button 
                            key={key}
                            onClick={() => setTab(key)}
                            className={`px-10 py-3 rounded-full font-black text-[10px] uppercase tracking-widest transition-all ${tab === key ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' : 'text-on-surface-variant opacity-60 hover:opacity-100'}`}
                        >
                            {label}
                        </motion.button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {tab === 'active' ? (
                        <motion.div key="active" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-8">
                            {activeOrders.map((order) => (
                                <motion.div key={order.id} whileHover={{ scale: 1.01 }} className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-primary/5 border border-outline-variant/10 relative overflow-hidden group cursor-pointer" onClick={() => navigate(`/vendor/order/${order.id.replace('#', '')}`)}>
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <motion.span animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="w-2.5 h-2.5 rounded-full bg-primary"></motion.span>
                                                <span className="text-primary font-black text-[10px] tracking-widest uppercase">{order.status}</span>
                                            </div>
                                            <h3 className="text-2xl font-black text-on-surface tracking-tighter">{order.id}</h3>
                                            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60 mt-1">{order.date}</p>
                                        </div>
                                        <p className="text-3xl font-headline font-black text-primary tracking-tighter">₹{order.price}</p>
                                    </div>
                                    <div className="mb-6">
                                        <div className="relative h-2.5 bg-surface-container-low rounded-full overflow-hidden shadow-inner">
                                            <motion.div initial={{ width: 0 }} animate={{ width: `${order.progress}%` }} transition={{ duration: 1.5, ease: "easeOut" }} className="absolute inset-y-0 left-0 vendor-gradient rounded-full" />
                                        </div>
                                    </div>
                                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full vendor-gradient text-on-primary py-4 rounded-2xl font-headline font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary/20 flex items-center justify-center gap-3">
                                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>receipt_long</span>
                                        View Details
                                    </motion.button>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div key="completed" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
                            <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 px-2">Archive · {completedOrders.length} orders</p>
                            {completedOrders.map((order, i) => (
                                <motion.div key={order.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} whileHover={{ x: 5 }} className="bg-white/50 backdrop-blur-sm rounded-[2rem] p-8 border border-outline-variant/10 shadow-sm">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="material-symbols-outlined text-sm text-outline-variant" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                                <span className="text-on-surface-variant/60 font-black text-[10px] tracking-widest uppercase">Delivered</span>
                                            </div>
                                            <h3 className="text-xl font-black text-on-surface tracking-tighter">{order.id}</h3>
                                            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-40 mt-1">{order.date}</p>
                                        </div>
                                        <p className="text-2xl font-black text-on-surface-variant/40 tracking-tighter">₹{order.price}</p>
                                    </div>
                                    <div className="bg-surface-container-low/40 rounded-2xl p-4 mb-5">
                                        <p className="text-xs font-bold text-on-surface-variant opacity-70 italic">{order.desc}</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <button className="flex-1 bg-surface-container text-on-surface py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-outline-variant/20 transition-all flex items-center justify-center gap-2 border border-outline-variant/10">
                                            <span className="material-symbols-outlined text-sm">receipt</span> View Invoice
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.main>
        </div>
    );
};

export default VendorOrderHistory;
