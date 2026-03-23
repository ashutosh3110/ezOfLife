import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ApprovalPending = () => {
    const navigate = useNavigate();

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-surface font-body text-on-surface min-h-screen flex flex-col items-center justify-center p-8 px-6 text-center"
        >
            <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 200, damping: 25 }}
                className="max-w-2xl bg-surface-container-low p-12 lg:p-16 rounded-[2.5rem] border border-white shadow-2xl relative overflow-hidden group"
            >
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-80 h-80 vendor-gradient opacity-10 blur-3xl rounded-full -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-110"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/10 blur-3xl rounded-full -ml-32 -mb-32"></div>

                <div className="relative z-10 flex flex-col items-center">
                    {/* Animated Pulsing Icon */}
                    <div className="relative mb-12 flex flex-col items-center">
                        <motion.div 
                            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }}
                            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                            className="absolute inset-0 vendor-gradient rounded-full blur-2xl"
                        />
                        <div className="w-28 h-28 vendor-gradient rounded-full flex items-center justify-center text-white shadow-2xl shadow-primary/40 relative">
                            <span className="material-symbols-outlined text-[56px] animate-pulse">pending_actions</span>
                        </div>
                    </div>

                    <h2 className="text-display-sm font-extrabold font-headline tracking-tighter text-on-surface mb-4 lg:mb-6 leading-none">Application Under Review</h2>
                    <p className="text-body-lg text-on-surface-variant font-medium max-w-md leading-relaxed mb-12 opacity-80">
                        Fantastic! Your details are safely with our verification team. We prioritize speed and security for all our vendor partners.
                    </p>

                    {/* Verification Progress Box */}
                    <div className="w-full bg-surface-container-high rounded-3xl p-8 border border-outline-variant/5 mb-12 flex flex-col lg:flex-row items-center gap-8 justify-around shadow-inner">
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-14 h-14 bg-primary/20 text-primary rounded-full flex items-center justify-center font-bold">
                                <span className="material-symbols-outlined text-[28px]">verified</span>
                            </div>
                            <p className="text-label-md uppercase tracking-widest font-extrabold text-primary">Identity Verified</p>
                        </div>
                        <div className="w-px h-12 bg-outline-variant/20 hidden lg:block"></div>
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-14 h-14 bg-surface rounded-full flex items-center justify-center text-on-surface-variant border border-outline-variant/10 relative overflow-hidden">
                                <motion.div 
                                    className="absolute inset-x-0 bottom-0 bg-primary/20"
                                    animate={{ height: ['0%', '100%', '0%'] }}
                                    transition={{ repeat: Infinity, duration: 4 }}
                                />
                                <span className="material-symbols-outlined text-[28px] animate-bounce-subtle">business</span>
                            </div>
                            <p className="text-label-md uppercase tracking-widest font-extrabold text-on-surface-variant opacity-60">Business Check</p>
                        </div>
                    </div>

                    <div className="space-y-4 w-full max-w-xs">
                        <motion.button 
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/vendor/dashboard')}
                            className="w-full py-5 vendor-gradient text-on-primary font-headline text-lg font-extrabold rounded-2xl shadow-2xl shadow-primary/20 transition-all active:scale-[0.98]"
                        >
                            Go to Dashboard
                        </motion.button>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            className="w-full py-5 bg-surface border border-outline-variant/10 text-on-surface-variant font-headline text-lg font-bold rounded-2xl hover:bg-surface-container transition-all"
                        >
                            Contact Support
                        </motion.button>
                    </div>

                    <p className="mt-12 text-label-md text-on-surface-variant font-bold uppercase tracking-widest flex items-center gap-3 opacity-60">
                        <span className="material-symbols-outlined text-[16px]">schedule</span>
                        ETC: 24h 15m
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ApprovalPending;
