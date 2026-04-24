import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const VendorProfile = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.clear();
        navigate('/vendor/auth');
        toast.success('Signed out successfully');
    };

    return (
        <div className="bg-[#F8FAFC] text-slate-900 min-h-screen pb-40 font-sans">
            <main className="max-w-md mx-auto px-6 pt-10 space-y-10">
                
                {/* PROFILE HEADER */}
                <header className="flex items-center gap-6">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-[2.2rem] bg-slate-200 border-4 border-white shadow-xl overflow-hidden">
                            <img 
                                src="https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=200" 
                                alt="Shop"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-slate-950 text-white rounded-xl flex items-center justify-center border-2 border-white shadow-lg">
                            <span className="material-symbols-outlined text-[14px]">verified</span>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-black tracking-tighter text-slate-950 leading-none mb-2">Spinzyt South Hub</h2>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">ID: VEND_98210</p>
                        <div className="flex items-center gap-2 mt-3">
                            <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border border-emerald-100">Live Status: ON</span>
                        </div>
                    </div>
                </header>

                {/* 1. BUSINESS DETAILS SECTION */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Business Details</h3>
                        <span className="material-symbols-outlined text-slate-200">business_center</span>
                    </div>
                    
                    <div className="bg-white p-7 rounded-[2.8rem] border border-slate-100 shadow-sm space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Shop Name</p>
                                <p className="text-[13px] font-black text-slate-900 tracking-tight">Spinzyt Dry Cleaners</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Owner Name</p>
                                <p className="text-[13px] font-black text-slate-900 tracking-tight">Rohan Sharma</p>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Registered Address</p>
                            <p className="text-[13px] font-black text-slate-900 tracking-tight leading-snug">45-B, Scheme No. 78, Vijay Nagar, Indore, MP 452010</p>
                        </div>
                        <div className="grid grid-cols-2 gap-6 pt-2">
                            <div className="space-y-1">
                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">GST Number</p>
                                <p className="text-[13px] font-black text-slate-900 tracking-tight">23AAAAA0000A1Z5</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">MSME Status</p>
                                <p className="text-[13px] font-black text-emerald-600 tracking-tight flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">check_circle</span> Verified
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. FINANCIAL PAYOUT DETAILS SECTION */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Financial Payouts</h3>
                        <span className="material-symbols-outlined text-slate-200">account_balance</span>
                    </div>
                    
                    <div className="bg-slate-950 text-white p-7 rounded-[2.8rem] shadow-2xl shadow-slate-900/20 space-y-6 relative overflow-hidden">
                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
                        
                        <div className="space-y-1 relative z-10">
                            <p className="text-[8px] font-black text-white/40 uppercase tracking-widest">Account Holder</p>
                            <p className="text-[15px] font-black text-white tracking-tight">Spinzyt Enterprises LLP</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6 relative z-10">
                            <div className="space-y-1">
                                <p className="text-[8px] font-black text-white/40 uppercase tracking-widest">Bank Name</p>
                                <p className="text-[13px] font-black text-white tracking-tight">HDFC Bank Ltd.</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[8px] font-black text-white/40 uppercase tracking-widest">IFSC Code</p>
                                <p className="text-[13px] font-black text-white tracking-tight uppercase">HDFC0001234</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 relative z-10">
                            <div className="space-y-1">
                                <p className="text-[8px] font-black text-white/40 uppercase tracking-widest">Account Number</p>
                                <p className="text-[13px] font-black text-white tracking-[0.2em]">**** **** 9821</p>
                            </div>
                            <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
                                <p className="text-[7px] font-black text-white/60 uppercase tracking-widest leading-none mb-1">Cycle</p>
                                <p className="text-[10px] font-black text-white tracking-widest uppercase">Weekly</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. PERFORMANCE METRICS SECTION */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Performance</h3>
                        <span className="material-symbols-outlined text-slate-200">insights</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: 'Avg Rating', val: '4.8', sub: 'Top 5%', icon: 'star', color: 'amber' },
                            { label: 'Completed', val: '1,240', sub: 'Orders', icon: 'check_circle', color: 'emerald' },
                            { label: 'Cancel Rate', val: '0.8%', sub: 'Healthy', icon: 'cancel', color: 'rose' },
                            { label: 'Ranking', val: '#12', sub: 'In Indore', icon: 'leaderboard', color: 'blue' }
                        ].map((metric, i) => (
                            <div key={i} className="bg-white p-5 rounded-[2.2rem] border border-slate-100 shadow-sm space-y-2">
                                <div className={`w-8 h-8 rounded-xl bg-${metric.color}-50 flex items-center justify-center text-${metric.color}-600`}>
                                    <span className="material-symbols-outlined text-lg">{metric.icon}</span>
                                </div>
                                <div>
                                    <h4 className="text-2xl font-black tracking-tighter text-slate-950">{metric.val}</h4>
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{metric.label} • {metric.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 4. UPLOAD VIDEO TOUR SECTION */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Facility Tour</h3>
                        <span className="material-symbols-outlined text-slate-200">videocam</span>
                    </div>
                    
                    <motion.div 
                        whileTap={{ scale: 0.98 }}
                        className="bg-white p-8 rounded-[2.8rem] border-2 border-dashed border-slate-200 flex flex-col items-center text-center space-y-4 hover:border-slate-950 transition-all cursor-pointer group"
                    >
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-slate-950 group-hover:text-white transition-all">
                            <span className="material-symbols-outlined text-3xl">movie</span>
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-sm font-black text-slate-950 uppercase tracking-tight">Upload Video Tour</h4>
                            <p className="text-[10px] font-bold text-slate-400 leading-relaxed uppercase tracking-widest max-w-[200px]">
                                Show customers your high-end facility & hygiene standards.
                            </p>
                        </div>
                    </motion.div>
                </section>

                {/* Action Footer */}
                <div className="flex flex-col gap-4 pt-4">
                    <button 
                        onClick={() => navigate('/vendor/support')}
                        className="w-full py-5 bg-white border border-slate-200 rounded-[2rem] text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] shadow-sm flex items-center justify-center gap-3 hover:bg-slate-50 transition-all"
                    >
                        <span className="material-symbols-outlined text-lg">support_agent</span>
                        Contact Help Desk
                    </button>
                    
                    <button 
                        onClick={handleSignOut}
                        className="w-full py-5 bg-rose-50 border border-rose-100 rounded-[2rem] text-[11px] font-black text-rose-500 uppercase tracking-[0.2em] flex items-center justify-center gap-3 active:scale-95 transition-all"
                    >
                        <span className="material-symbols-outlined text-lg">logout</span>
                        Terminate Session
                    </button>
                </div>

                <div className="text-center pb-12">
                    <p className="text-[9px] font-black text-slate-200 uppercase tracking-[0.6em]">SPINZYT VENDOR • GOLD PARTNER • v2.8.1</p>
                </div>
            </main>
        </div>
    );
};

export default VendorProfile;
