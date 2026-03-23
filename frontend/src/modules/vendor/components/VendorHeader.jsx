import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const VendorHeader = ({ title = "Ez of Life", showBack = false }) => {
    const navigate = useNavigate();
    return (
        <motion.header 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-surface/70 backdrop-blur-xl sticky top-0 z-50 flex justify-between items-center w-full px-6 py-4 border-b border-outline-variant/5"
        >
            <div className="flex items-center gap-3">
                {showBack && (
                    <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-surface-container-low transition-colors">
                        <span className="material-symbols-outlined text-primary">arrow_back</span>
                    </motion.button>
                )}
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
                    <h1 className="font-headline font-bold text-headline-sm tracking-tight text-primary leading-none">{title}</h1>
                    <span className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-50">Vendor Partner</span>
                </div>
            </div>
            <motion.button 
                whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate('/vendor/notifications')}
                className="w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-300"
            >
                <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
            </motion.button>
        </motion.header>
    );
};

export default VendorHeader;
