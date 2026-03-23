import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const navigate = useNavigate();

    const containerVariants = {
        animate: { transition: { staggerChildren: 0.1 } }
    };
    const itemVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <div className="bg-surface text-on-surface min-h-screen pb-32">
            {/* TopAppBar */}
            <motion.header 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-surface/70 backdrop-blur-xl sticky top-0 z-50 flex justify-between items-center w-full px-6 py-4 border-b border-outline-variant/5"
            >
                <div className="flex items-center gap-3">
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/vendor/profile')}
                        className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center overflow-hidden cursor-pointer shadow-sm"
                    >
                        <img 
                            className="w-full h-full object-cover" 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAT1G7gcHTDKYAyUsrelXEMf2w6RQyBCMwtQmyqi-a7ZPOQcRRYhe1gqMBSPUsXY8Ru16zqZWc8aMj-kve41JSGpk8PBMQSmPvwiBPyQnE-KlBH_j2zy2u_kqX_CmMYKy2-bOYW3G-i3PiCbE759VmmQXpJyL_cmmWYbnIEV-rZR8sjSexO93iameBgS7Rd19y8CQTrD4Ke46jtuCZrbKo6LTv7KtyX4330_FAPFGYdMldUrndR32fDYqOWnPk42gI1Zxydi6FSoas" 
                            alt="Vendor Profile"
                        />
                    </motion.div>
                    <div>
                        <h1 className="font-headline font-bold text-headline-sm tracking-tight text-primary leading-none">Ez of Life</h1>
                        <span className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-50">Vendor Partner</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <motion.button 
                        whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => navigate('/vendor/notifications')}
                        className="w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-300"
                    >
                        <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
                    </motion.button>
                </div>
            </motion.header>

            <motion.main 
                variants={containerVariants}
                initial="initial"
                animate="animate"
                className="max-w-7xl mx-auto px-6 pt-8 space-y-12"
            >
                {/* Stats Section */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div variants={itemVariants} className="bg-surface-container-lowest p-8 rounded-xl shadow-sm flex flex-col justify-between group cursor-default hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <span className="text-label-md uppercase tracking-widest text-on-surface-variant font-semibold">Today's Earnings</span>
                            <span className="material-symbols-outlined text-primary group-hover:rotate-12 transition-transform">payments</span>
                        </div>
                        <div className="mt-4">
                            <h2 className="text-4xl font-extrabold font-headline text-on-surface">₹1,420</h2>
                            <p className="text-sm text-primary font-medium mt-1">+12.5% from yesterday</p>
                        </div>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="bg-primary text-on-primary p-8 rounded-xl shadow-lg flex flex-col justify-between relative overflow-hidden group cursor-default">
                        <div className="relative z-10 flex justify-between items-start">
                            <span className="text-label-md uppercase tracking-widest opacity-80 font-semibold text-on-primary">Active Orders</span>
                            <span className="material-symbols-outlined group-hover:animate-bounce-subtle">local_laundry_service</span>
                        </div>
                        <div className="relative z-10 mt-4">
                            <h2 className="text-4xl font-extrabold font-headline">8</h2>
                            <p className="text-sm opacity-90 mt-1">4 estimated completion today</p>
                        </div>
                        <div className="absolute inset-0 vendor-gradient opacity-20"></div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="bg-surface-container-low p-8 rounded-xl flex flex-col justify-between border border-outline-variant/10 cursor-default hover:bg-surface-container-high transition-colors">
                        <div className="flex justify-between items-start">
                            <span className="text-label-md uppercase tracking-widest text-on-surface-variant font-semibold">Pending Pickups</span>
                            <span className="material-symbols-outlined text-secondary">distance</span>
                        </div>
                        <div className="mt-4">
                            <h2 className="text-4xl font-extrabold font-headline text-on-surface">3</h2>
                            <p className="text-sm text-on-surface-variant mt-1">Next: 1.2 km away</p>
                        </div>
                    </motion.div>
                </section>

                {/* Order Workflow Section */}
                <motion.section variants={itemVariants}>
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                        <div>
                            <h3 className="text-headline-sm font-bold font-headline text-on-surface">Order Workflow</h3>
                            <p className="text-on-surface-variant text-body-lg">Manage your service pipeline in real-time</p>
                        </div>
                        <div className="flex p-1 bg-surface-container-low rounded-full w-fit border border-outline-variant/10">
                            {['Available', 'In Progress', 'Ready'].map((tab, idx) => (
                                <motion.button 
                                    key={tab}
                                    whileTap={{ scale: 0.95 }}
                                    className={`px-6 py-2 rounded-full text-label-md font-bold transition-all duration-300 ${idx === 0 ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-primary'}`}
                                >
                                    {tab}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <OrderCard id="EZ-8821" title="Premium Wash & Fold" desc="Estimated: 12.5 kg · Mixed Fabrics" dist="0.8 km away" icon="dry_cleaning" navigate={navigate} />
                        <OrderCard id="EZ-8824" title="Eco-Friendly Dry Clean" desc="5 Items · 2 Suits, 3 Silk Shirts" dist="2.4 km away" icon="checkroom" navigate={navigate} delay={0.1} />
                        <OrderCard id="EZ-8825" title="Ironing Only" desc="15 Cotton Shirts · Starch Preferred" dist="1.5 km away" icon="iron" navigate={navigate} delay={0.2} />
                    </div>
                </motion.section>

                {/* Performance Section */}
                <motion.section variants={itemVariants} className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-headline-sm font-bold font-headline text-on-surface">Performance Pulse</h3>
                        <motion.button 
                            whileHover={{ x: 5 }}
                            onClick={() => navigate('/vendor/earnings')} 
                            className="text-primary font-bold text-sm uppercase tracking-widest flex items-center gap-2"
                        >
                            Full Analytics
                            <span className="material-symbols-outlined text-sm">trending_up</span>
                        </motion.button>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex-1 bg-surface-container-lowest p-6 rounded-lg h-48 flex items-end gap-3 justify-around overflow-hidden border border-outline-variant/5">
                            {[0.5, 0.66, 0.9, 0.33, 0.5, 0.75, 0.5].map((h, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h * 100}%` }}
                                    transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: "circOut" }}
                                    className={`w-12 rounded-t-full ${i === 2 ? 'vendor-gradient' : 'bg-primary-container/40'}`}
                                />
                            ))}
                        </div>
                        <div className="lg:w-1/3 space-y-4">
                            <div className="flex justify-between items-center p-4 bg-surface-container-low rounded-lg border border-outline-variant/5">
                                <span className="text-on-surface-variant font-medium">Service Quality</span>
                                <span className="font-bold text-primary">4.9 / 5.0</span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-surface-container-low rounded-lg border border-outline-variant/5">
                                <span className="text-on-surface-variant font-medium">On-Time Completion</span>
                                <span className="font-bold text-primary">98%</span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-surface-container-low rounded-lg border border-outline-variant/5">
                                <span className="text-on-surface-variant font-medium">Customer Retention</span>
                                <span className="font-bold text-primary">82%</span>
                            </div>
                        </div>
                    </div>
                </motion.section>
            </motion.main>
        </div>
    );
};

const OrderCard = ({ id, title, desc, dist, icon, navigate, delay = 0 }) => (
    <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        whileHover={{ y: -5 }}
        className="bg-surface-container-lowest rounded-xl p-6 transition-all duration-300 border border-outline-variant/10 shadow-sm flex flex-col"
    >
        <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-primary-container/30 rounded-lg text-primary">
                <span className="material-symbols-outlined">{icon}</span>
            </div>
            <div className="text-right">
                <p className="text-label-md font-bold text-primary">#{id}</p>
                <p className="text-xs text-on-surface-variant font-medium">Recently added</p>
            </div>
        </div>
        <div className="space-y-4 mb-8">
            <div>
                <h4 className="text-body-lg font-bold text-on-surface">{title}</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">{desc}</p>
            </div>
            <div className="flex items-center gap-2 text-primary bg-primary-container/20 w-fit px-3 py-1 rounded-full">
                <span className="material-symbols-outlined text-[16px]">location_on</span>
                <span className="text-xs font-bold tracking-tight uppercase">{dist}</span>
            </div>
        </div>
        <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/vendor/order/${id}`)} 
            className="mt-auto w-full py-4 rounded-lg vendor-gradient text-white font-bold text-center flex items-center justify-center gap-2 group shadow-md"
        >
            <span>Accept Order</span>
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </motion.button>
    </motion.div>
);

export default Dashboard;
