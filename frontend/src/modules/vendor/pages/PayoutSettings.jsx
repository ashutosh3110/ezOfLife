import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import VendorHeader from '../components/VendorHeader';

const PayoutSettings = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-surface font-body text-on-surface min-h-screen pb-32">
            <VendorHeader />

            <motion.main 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto px-6 pt-12"
            >
                {/* Header Section */}
                <section className="mb-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-2">
                            <span className="font-label text-label-md uppercase tracking-widest text-primary font-bold">Financial Security</span>
                            <h2 className="font-headline text-5xl font-extrabold tracking-tighter text-on-background line-clamp-2 leading-none">Bank & Payouts</h2>
                        </div>
                        <motion.div 
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            whileHover={{ scale: 1.02 }}
                            className="bg-surface-container-low p-6 rounded-2xl border-l-4 border-primary shadow-sm max-w-sm flex items-start gap-4"
                        >
                            <div className="p-3 bg-primary-container/20 text-primary rounded-xl">
                                <span className="material-symbols-outlined animate-pulse">schedule</span>
                            </div>
                            <div>
                                <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold leading-none mb-1">Next Settlement</p>
                                <p className="font-headline text-xl font-bold text-on-background uppercase tracking-tighter">Friday, Oct 27</p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Linked Bank Account Card */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-8 bg-surface-container-lowest rounded-2xl p-10 relative overflow-hidden border border-outline-variant/10 shadow-sm"
                    >
                        <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12 -mr-16 -mt-16">
                            <span className="material-symbols-outlined text-[240px]">account_balance</span>
                        </div>
                        
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-12">
                                <div>
                                    <h3 className="font-headline text-2xl font-bold text-on-background mb-2">Linked Bank Account</h3>
                                    <p className="text-on-surface-variant text-body-lg font-medium opacity-80 max-w-sm">Active payout destination for all weekly service earnings.</p>
                                </div>
                                <div className="bg-primary/10 text-primary px-4 py-1.5 rounded-full flex items-center gap-2">
                                    <span className="w-2 h-2 bg-primary rounded-full animate-ping"></span>
                                    <span className="text-[10px] font-extrabold uppercase tracking-widest">Verified</span>
                                </div>
                            </div>
                            
                            <div className="space-y-8 max-w-md">
                                {[
                                    { label: 'Account Holder', value: 'Pristine Cleaners Pvt. Ltd.', icon: 'person' },
                                    { label: 'Account Number', value: 'SBIN •••• •••• 7781', icon: 'credit_card', type: 'password' },
                                    { label: 'Bank Name', value: 'State Bank of India', icon: 'account_balance' }
                                ].map((field) => (
                                    <motion.div key={field.label} className="group/field transition-all border-b border-outline-variant/5 pb-4 last:border-0 grow">
                                        <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold opacity-60 flex items-center gap-2 mb-2 group-hover/field:text-primary transition-colors">
                                            {field.label}
                                        </label>
                                        <div className="flex items-center gap-4">
                                            <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center group-hover/field:bg-primary-container transition-all">
                                                <span className="material-symbols-outlined text-[16px] group-hover/field:text-primary">{field.icon}</span>
                                            </div>
                                            <p className="font-headline text-xl font-bold text-on-background tracking-tighter truncate">{field.value}</p>
                                            {field.type === 'password' && <span className="material-symbols-outlined text-sm text-primary cursor-pointer hover:scale-110 ml-auto">visibility</span>}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            
                            <div className="mt-12">
                                <motion.button 
                                    whileHover={{ scale: 1.05, x: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="vendor-gradient text-on-primary px-10 py-5 rounded-2xl font-bold flex items-center gap-3 hover:shadow-xl hover:shadow-primary/20 transition-all font-headline uppercase tracking-widest text-xs"
                                >
                                    <span className="material-symbols-outlined text-[18px]">edit</span>
                                    Update Details
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>

                    <div className="md:col-span-4 space-y-6">
                        {/* Payout Policy Card */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-surface-container-low rounded-2xl p-8 border border-outline-variant/10 shadow-sm"
                        >
                            <h4 className="font-headline font-bold text-on-background mb-6 text-xl tracking-tight">Payout Policy</h4>
                            <ul className="space-y-6">
                                <li className="flex gap-4 group">
                                    <div className="shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:vendor-gradient group-hover:text-white transition-all">
                                        <span className="material-symbols-outlined text-[16px]">event_repeat</span>
                                    </div>
                                    <p className="text-sm font-medium text-on-surface-variant leading-tight">Weekly settlements processed every <span className="font-bold text-on-surface">Friday</span>.</p>
                                </li>
                                <li className="flex gap-4 group">
                                    <div className="shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:vendor-gradient group-hover:text-white transition-all">
                                        <span className="material-symbols-outlined text-[16px]">payments</span>
                                    </div>
                                     <p className="text-sm font-medium text-on-surface-variant leading-tight">Minimum payout threshold: <span className="font-bold text-on-surface">₹500</span>.</p>
                                </li>
                            </ul>
                        </motion.div>
                        
                        {/* Security Badge */}
                        <motion.div 
                            whileHover={{ y: -5 }}
                            className="bg-primary/5 rounded-2xl p-8 border border-primary/20 group"
                        >
                            <div className="flex flex-col gap-4">
                                <div className="w-16 h-16 vendor-gradient rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/20 rotate-6 group-hover:rotate-0 transition-transform duration-500">
                                    <span className="material-symbols-outlined text-[32px] font-black">lock_open</span>
                                </div>
                                <div>
                                    <h4 className="font-headline font-extrabold text-on-background text-xl mb-2 tracking-tight">Vault-Grade Security</h4>
                                    <p className="text-sm text-on-surface-variant font-medium leading-relaxed opacity-80">
                                        All bank accounts are secured with AES-256 bank-level encryption. 
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Integration Info */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 p-8 bg-surface-container-low rounded-2xl border border-outline-variant/10 flex flex-col md:flex-row items-center justify-between gap-8 cursor-pointer hover:bg-white transition-all"
                >
                    <div className="flex items-center gap-6">
                        <div className="p-4 bg-tertiary-container/30 text-tertiary rounded-full">
                            <span className="material-symbols-outlined font-bold">help</span>
                        </div>
                        <div>
                            <h4 className="font-bold font-headline text-lg">Payout discrepancy?</h4>
                            <p className="text-on-surface-variant font-medium text-sm">Our 24/7 financial support team is here to assist you.</p>
                        </div>
                    </div>
                    <motion.button whileHover={{ gap: '16px' }} className="text-primary font-extrabold flex items-center gap-3 uppercase tracking-widest text-xs">
                        Open Financial Ticket
                        <span className="material-symbols-outlined">arrow_forward_ios</span>
                    </motion.button>
                </motion.div>
            </motion.main>
        </div>
    );
};

export default PayoutSettings;
