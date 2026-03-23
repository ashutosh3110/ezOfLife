import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import VendorHeader from '../components/VendorHeader';

const ServiceManagement = () => {
    const navigate = useNavigate();

    const services = [
        { icon: "local_laundry_service", title: "Wash & Fold", unit: "Per Kg", price: "99", active: true },
        { icon: "dry_cleaning", title: "Dry Cleaning", unit: "Per Piece", price: "149", active: true },
        { icon: "bed", title: "Bedding & Linens", unit: "Per Set", price: "249", active: true },
        { icon: "iron", title: "Ironing Only", unit: "Per Piece", price: "49", active: false },
    ];

    const containerVariants = {
        animate: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
    };

    return (
        <div className="bg-surface text-on-surface min-h-screen pb-32">
            <VendorHeader />

            <motion.main 
                variants={containerVariants}
                initial="initial"
                animate="animate"
                className="max-w-5xl mx-auto px-6 pt-8 pb-32"
            >
                {/* Editorial Header Section */}
                <motion.section variants={{ initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } }} className="mb-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-2">
                            <span className="text-label-md font-bold uppercase tracking-widest text-primary-dim block">Inventory Control</span>
                            <h2 className="font-headline text-display-sm font-extrabold tracking-tight text-on-surface max-w-lg leading-tight">Manage your services & active pricing.</h2>
                        </div>
                        <motion.button whileHover={{ x: 5 }} className="group flex items-center gap-2 text-primary font-bold transition-all duration-300">
                            <span className="text-label-md uppercase tracking-widest">Manage Promotions</span>
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </motion.button>
                    </div>
                </motion.section>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Information Panel */}
                    <motion.div 
                        variants={{ initial: { scale: 0.95 }, animate: { scale: 1 } }}
                        className="lg:col-span-4 space-y-6"
                    >
                        <div className="bg-surface-container-low p-8 rounded-2xl border border-white shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-14 h-14 bg-primary text-on-primary rounded-xl flex items-center justify-center mb-8 shadow-lg shadow-primary/20 rotate-3">
                                <span className="material-symbols-outlined text-3xl font-bold">lightbulb</span>
                            </div>
                            <h3 className="font-headline text-headline-sm font-bold mb-3 tracking-tight">Pricing Strategy</h3>
                            <p className="text-body-lg text-on-surface-variant leading-relaxed font-body">
                                Top vendors in your district set <span className="text-primary font-bold">Wash & Fold</span> starting at ₹99/kg for high retention.
                            </p>
                            <motion.button whileHover={{ scale: 1.05 }} className="mt-8 text-primary font-bold uppercase tracking-widest text-xs flex items-center gap-1 group">
                                Read Strategy Guide 
                                <span className="material-symbols-outlined transition-transform">auto_awesome</span>
                            </motion.button>
                        </div>
                        
                        <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10 overflow-hidden relative">
                            <div className="absolute -right-4 -bottom-4 opacity-5 rotate-12">
                                <span className="material-symbols-outlined text-9xl">analytics</span>
                            </div>
                            <h3 className="font-label text-label-md font-bold uppercase tracking-widest text-primary mb-6">Service Health</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-on-surface-variant font-medium">Platform Visibility</span>
                                    <span className="font-bold text-headline-xs tracking-tighter text-primary">84%</span>
                                </div>
                                <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                                    <motion.div initial={{ width: 0 }} animate={{ width: '84%' }} transition={{ duration: 1.5, ease: "circOut" }} className="vendor-gradient h-full rounded-full" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Service List (Main Content) */}
                    <div className="lg:col-span-8 space-y-4">
                        {services.map((service, idx) => (
                            <ServiceItemWithMotion key={service.title} {...service} idx={idx} />
                        ))}

                        {/* Save Changes Area */}
                        <motion.div 
                            variants={{ initial: { opacity: 0 }, animate: { opacity: 1 } }}
                            className="pt-12 pb-12 flex flex-col items-center"
                        >
                            <motion.button 
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-6 vendor-gradient text-on-primary font-extrabold text-headline-sm rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-3 active:shadow-inner"
                            >
                                <span className="material-symbols-outlined font-bold">save</span>
                                Save Changes
                            </motion.button>
                            <p className="mt-6 text-label-md text-on-surface-variant font-bold uppercase tracking-widest opacity-60">Synchronizing with customer app</p>
                        </motion.div>
                    </div>
                </div>
            </motion.main>
        </div>
    );
};

const ServiceItemWithMotion = ({ icon, title, unit, price, active, idx }) => (
    <motion.div 
        variants={{ initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 } }}
        whileHover={{ x: 10, scale: 1.01, backgroundColor: "rgba(255,255,255,0.7)" }}
        className="group bg-surface-container-low p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300 border border-outline-variant/10 shadow-sm hover:shadow-lg cursor-pointer"
    >
        <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-surface outline outline-1 outline-primary-container text-primary rounded-xl flex items-center justify-center shadow-inner group-hover:vendor-gradient group-hover:text-white transition-all duration-500">
                <span className="material-symbols-outlined text-[36px] group-hover:scale-110 transition-transform">{icon}</span>
            </div>
            <div>
                <h4 className="font-headline text-xl font-extrabold tracking-tight text-on-surface">{title}</h4>
                <p className="text-label-md text-on-surface-variant font-bold uppercase tracking-tighter opacity-70">{unit}</p>
            </div>
        </div>
        <div className="flex items-center gap-8">
            <div className="relative group/input">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-extrabold group-hover/input:scale-110 transition-transform">₹</span>
                <input 
                    className="bg-surface border-2 border-transparent group-hover/input:border-primary/20 rounded-xl pl-9 pr-4 py-4 w-32 font-black text-headline-sm text-on-surface focus:ring-4 focus:ring-primary/10 transition-all outline-none shadow-inner" 
                    defaultValue={price} 
                    type="text" 
                />
            </div>
            
            {/* Custom UI Toggle */}
            <label className="relative inline-flex items-center cursor-pointer scale-110">
                <input className="sr-only peer" defaultChecked={active} type="checkbox" />
                <div className="w-14 h-8 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:vendor-gradient shadow-inner"></div>
            </label>
        </div>
    </motion.div>
);

export default ServiceManagement;
