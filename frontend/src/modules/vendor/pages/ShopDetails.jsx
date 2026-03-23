import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ShopDetails = () => {
    const navigate = useNavigate();

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-surface font-body text-on-surface min-h-screen"
        >
            {/* Header Navigation */}
            <motion.nav 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-surface/70 backdrop-blur-xl sticky top-0 z-50 flex justify-between items-center w-full px-6 py-4 border-b border-outline-variant/5 shadow-sm"
            >
                <div className="flex items-center gap-4">
                    <motion.button 
                        whileTap={{ scale: 0.9 }}
                        onClick={() => navigate(-1)} 
                        className="p-2 hover:bg-surface-container-low transition-colors duration-300 rounded-full"
                    >
                        <span className="material-symbols-outlined text-on-surface">arrow_back</span>
                    </motion.button>
                    <h1 className="font-headline font-bold text-headline-sm tracking-tight text-on-surface">Shop Details</h1>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden border border-outline-variant/20 shadow-inner">
                        <img 
                            className="w-full h-full object-cover" 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJv0eL8fD2DkjwL6fX4Z5Vb5Q-tXJ1ZInU0U-V_2T_6_8_2X-T-V_X_2V_6_8_2X-T-V_X_2V_6_8_2X" 
                            alt="Vendor Placeholder"
                        />
                    </div>
                </div>
            </motion.nav>

            <motion.main 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-4xl mx-auto px-6 pt-12 pb-32"
            >
                {/* Progress Stepper */}
                <div className="mb-12 flex items-center justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 vendor-gradient rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20">1</div>
                            <div>
                                <p className="text-label-md uppercase tracking-widest font-bold text-primary">Step 1</p>
                                <h2 className="font-headline font-bold text-headline-sm tracking-tight">Shop Details</h2>
                            </div>
                        </div>
                    </div>
                    <div className="w-24 h-1.5 bg-surface-container-high rounded-full mx-4 overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '40%' }}
                            transition={{ duration: 1.5, ease: "circOut" }}
                            className="h-full vendor-gradient rounded-full"
                        />
                    </div>
                    <div className="flex-1 opacity-40 grayscale">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-surface-container-high rounded-full flex items-center justify-center text-on-surface-variant font-bold border border-outline-variant/10">2</div>
                            <div>
                                <p className="text-label-md uppercase tracking-widest font-bold text-on-surface-variant">Step 2</p>
                                <h2 className="font-headline font-bold text-headline-sm tracking-tight opacity-50">Documents</h2>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Fields Section */}
                <div className="space-y-8">
                    {/* Input Group: Shop Name */}
                    <motion.div whileFocus={{ scale: 1.01 }} className="flex flex-col gap-3 group">
                        <label className="font-headline font-bold text-on-surface-variant text-sm uppercase tracking-widest px-1 group-focus-within:text-primary transition-colors">Shop Name</label>
                        <input 
                            className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary/20 focus:bg-white p-5 rounded-2xl text-headline-sm font-bold text-on-surface transition-all outline-none shadow-inner group-hover:border-outline-variant/30" 
                            placeholder="e.g. Pristine Cleaners" 
                            type="text" 
                        />
                    </motion.div>

                    {/* Input Group: GST Number */}
                    <div className="flex flex-col gap-3 group">
                        <label className="font-headline font-bold text-on-surface-variant text-sm uppercase tracking-widest px-1 group-focus-within:text-primary transition-colors">GST Number (Optional)</label>
                        <input 
                            className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary/20 focus:bg-white p-5 rounded-2xl text-headline-sm font-bold text-on-surface transition-all outline-none shadow-inner group-hover:border-outline-variant/30" 
                            placeholder="Enter 15-digit GSTIN" 
                            type="text" 
                        />
                    </div>

                    {/* Map Interaction Placeholder */}
                    <div className="flex flex-col gap-3 group">
                        <label className="font-headline font-bold text-on-surface-variant text-sm uppercase tracking-widest px-1 group-focus-within:text-primary transition-colors">Business Address</label>
                        <motion.div 
                            whileHover={{ y: -3 }}
                            className="relative w-full h-80 rounded-2xl bg-surface-container overflow-hidden p-6 border-2 border-transparent hover:border-primary/10 transition-all shadow-sm group-hover:shadow-md"
                        >
                            <img 
                                alt="Map Background" 
                                className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700" 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-6L-D7t3S2e8R7_yX9G6L9p5V4X_mS-5V4X_mS-5V4X_mS-5V4X_mS-5V4X_mS" 
                            />
                            <div className="relative z-10 flex flex-col justify-between h-full">
                                <div className="flex justify-end">
                                    <button className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-2 shadow-xl hover:bg-white transition-all text-sm font-bold scale-95 hover:scale-100">
                                        <span className="material-symbols-outlined text-primary text-[20px]">my_location</span>
                                        Use Current Location
                                    </button>
                                </div>
                                <div className="bg-white shadow-2xl p-6 rounded-xl flex items-center gap-4 border border-outline-variant/10">
                                    <div className="w-12 h-12 bg-primary-container/20 rounded-full flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined">location_on</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-body-lg font-bold text-on-surface truncate">241 Baker Street, London, UK</p>
                                        <p className="text-body-sm text-on-surface-variant font-medium">Tap to modify address pinpoint</p>
                                    </div>
                                    <span className="material-symbols-outlined text-on-surface-variant/40">chevron_right</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Service Selection Checklist */}
                    <div className="flex flex-col gap-6">
                        <label className="font-headline font-bold text-on-surface-variant text-sm uppercase tracking-widest px-1">Services Offered</label>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { title: 'Wash & Fold', icon: 'local_laundry_service' },
                                { title: 'Dry Cleaning', icon: 'dry_cleaning' },
                                { title: 'Steam Press', icon: 'iron' },
                                { title: 'Shoe Laundry', icon: 'checkroom' }
                            ].map((service, i) => (
                                <motion.button 
                                    key={service.title}
                                    whileHover={{ y: -5, shadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all group/item ${i === 0 ? 'bg-primary/5 border-primary shadow-sm' : 'bg-surface border-outline-variant/10 hover:border-primary/20'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl transition-colors ${i === 0 ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant group-hover/item:bg-primary-container/20'}`}>
                                            <span className="material-symbols-outlined text-[24px]">{service.icon}</span>
                                        </div>
                                        <span className={`font-headline font-bold ${i === 0 ? 'text-primary' : 'text-on-surface-variant'}`}>{service.title}</span>
                                    </div>
                                    {i === 0 && <span className="material-symbols-outlined text-primary font-bold">check_circle</span>}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Confirm Action Button */}
                <div className="mt-16 flex flex-col items-center gap-6">
                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate('/vendor/upload-documents')}
                        className="vendor-gradient text-white w-full md:w-auto md:min-w-[400px] py-6 px-12 rounded-2xl font-headline font-extrabold text-lg shadow-2xl shadow-primary/20 hover:shadow-primary/30 transition-all flex items-center justify-center gap-4 active:scale-95"
                    >
                        Continue to Documents
                        <span className="material-symbols-outlined animate-bounce-horizontal">arrow_forward</span>
                    </motion.button>
                    <p className="text-on-surface-variant font-bold text-label-md uppercase tracking-widest opacity-60">Estimated Review: 24-48 Hours</p>
                </div>
            </motion.main>
        </motion.div>
    );
};

export default ShopDetails;
