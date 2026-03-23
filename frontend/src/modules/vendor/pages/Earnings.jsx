import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import VendorHeader from '../components/VendorHeader';

const Earnings = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-surface text-on-surface min-h-screen pb-32">
            <VendorHeader />

            <motion.main 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-5xl mx-auto px-6 py-8"
            >
                {/* Dashboard Header */}
                <section className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <motion.div initial={{ x: -20 }} animate={{ x: 0 }}>
                        <p className="font-label font-bold text-label-md uppercase tracking-widest text-primary mb-2">Financial Overview</p>
                        <h2 className="text-display-sm md:text-display-md font-extrabold tracking-tighter text-on-surface leading-none">Earnings</h2>
                    </motion.div>
                    
                    <div className="flex bg-surface-container-low p-1 rounded-full w-fit border border-outline-variant/10">
                        {['Daily', 'Weekly', 'Monthly'].map((filter) => (
                            <motion.button 
                                key={filter}
                                whileTap={{ scale: 0.95 }}
                                className={`px-6 py-2 rounded-full text-label-md font-bold transition-all ${filter === 'Weekly' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-primary'}`}
                            >
                                {filter}
                            </motion.button>
                        ))}
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
                    {/* Total Balance */}
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        whileHover={{ scale: 1.02 }}
                        className="md:col-span-12 lg:col-span-5 vendor-gradient rounded-2xl p-8 shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[220px]"
                    >
                        <div className="relative z-10">
                            <span className="text-white/80 font-label font-bold text-label-md uppercase tracking-widest">Total Balance</span>
                            <h3 className="text-white text-4xl lg:text-5xl font-extrabold mt-3 tracking-tighter">₹12,840</h3>
                        </div>
                        <div className="relative z-10 flex justify-between items-end mt-8">
                            <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">+12.5%</span>
                            <motion.button 
                                whileHover={{ scale: 1.1 }}
                                onClick={() => navigate('/vendor/payouts')}
                                className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-md border border-white/20 transition-all"
                            >
                                <span className="material-symbols-outlined">trending_up</span>
                            </motion.button>
                        </div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                    </motion.div>

                    {/* Pending Payout */}
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="md:col-span-12 lg:col-span-7 bg-surface-container-low rounded-2xl p-8 shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[220px] border border-outline-variant/10"
                    >
                        <div className="relative z-10">
                            <span className="text-on-surface-variant font-label font-bold text-label-md uppercase tracking-widest">Pending Payout</span>
                            <h3 className="text-on-surface text-4xl lg:text-5xl font-extrabold mt-3 tracking-tighter">₹2,450</h3>
                        </div>
                        <div className="relative z-10 flex justify-between items-end mt-8">
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Due Friday</span>
                        </div>
                    </motion.div>

                    {/* Weekly Trend Chart Card */}
                    <motion.div 
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="md:col-span-12 bg-surface-container-low rounded-2xl p-8 border border-outline-variant/10 shadow-sm"
                    >
                        <div className="flex justify-between items-start mb-12">
                            <div>
                                <h4 className="font-bold font-headline text-headline-sm text-on-surface">Weekly Performance</h4>
                                <p className="text-on-surface-variant text-body-md font-medium">Growth analysis for Mar 17–23</p>
                            </div>
                            <div className="flex items-center gap-2 text-primary font-extrabold">
                                <span className="material-symbols-outlined text-4xl">trending_up</span>
                                <span className="text-headline-sm">+24%</span>
                            </div>
                        </div>
                        <div className="flex items-end justify-between gap-4 h-56 pt-6">
                            {[45, 65, 55, 90, 45, 75, 30].map((h, i) => (
                                <div key={i} className="flex flex-col items-center grow gap-4 group cursor-pointer">
                                    <div className="relative w-full overflow-hidden rounded-t-xl h-full bg-surface-container-high/30">
                                        <motion.div 
                                            initial={{ height: 0 }}
                                            animate={{ height: `${h}%` }}
                                            transition={{ duration: 1.2, delay: 0.6 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                            className={`absolute bottom-0 w-full rounded-t-xl transition-all ${i === 3 ? 'vendor-gradient shadow-lg' : 'bg-primary/20 group-hover:bg-primary/40'}`}
                                        />
                                    </div>
                                    <span className={`text-label-md font-bold uppercase tracking-tight ${i === 3 ? 'text-primary' : 'text-on-surface-variant opacity-60'}`}>
                                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Recent Settlements Section */}
                <motion.section 
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-6"
                >
                    <div className="flex justify-between items-center px-2">
                        <h3 className="text-headline-sm font-bold font-headline text-on-surface tracking-tight">Recent Payouts</h3>
                        <motion.button whileHover={{ gap: '12px' }} className="text-primary font-bold text-label-md flex items-center gap-2 group">
                            Full History
                            <span className="material-symbols-outlined text-sm group-hover:scale-125 transition-transform">arrow_forward_ios</span>
                        </motion.button>
                    </div>
                    
                    <div className="space-y-4">
                        {[
                            { id: '#SETT-9821', date: 'Mar 23, 2026', amt: '₹2,450' },
                            { id: '#SETT-9740', date: 'Mar 16, 2026', amt: '₹1,820' },
                            { id: '#SETT-9655', date: 'Mar 09, 2026', amt: '₹3,105' },
                        ].map((payout, i) => (
                            <motion.div 
                                key={payout.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 + i * 0.1 }}
                                whileHover={{ x: 8 }}
                                className="bg-surface-container-low p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-outline-variant/5 shadow-sm transition-colors cursor-pointer hover:bg-white"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 bg-primary-container/20 rounded-full flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined text-[28px]">payments</span>
                                    </div>
                                    <div>
                                        <p className="text-body-lg font-bold text-on-surface">Bank Deposit · {payout.id}</p>
                                        <p className="text-label-md text-on-surface-variant font-medium opacity-80">{payout.date} · 11:45 AM</p>
                                    </div>
                                </div>
                                <div className="text-left md:text-right">
                                    <p className="text-2xl font-extrabold text-on-surface tracking-tighter">{payout.amt}</p>
                                    <p className="text-xs font-bold text-green-600 uppercase tracking-widest mt-1 flex items-center md:justify-end gap-1">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                        Completed
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>
            </motion.main>
        </div>
    );
};

export default Earnings;
