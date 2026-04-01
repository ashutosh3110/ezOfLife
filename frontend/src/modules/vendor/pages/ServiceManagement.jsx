import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MASTER_SERVICES } from '../../../shared/data/sharedData';
import VendorHeader from '../components/VendorHeader';

const ServiceManagement = () => {
    const navigate = useNavigate();
    const [services, setServices] = useState(
        MASTER_SERVICES.map(s => ({
            ...s,
            active: true // Default all to active for now
        }))
    );

    const toggleService = (idx) => {
        const newServices = [...services];
        newServices[idx].active = !newServices[idx].active;
        setServices(newServices);
    };

    const updatePrice = (idx, price) => {
        const newServices = [...services];
        newServices[idx].basePrice = price;
        setServices(newServices);
    };

    const handleUpdate = () => {
        // In a real app, save to backend
        localStorage.setItem('vendor_services_V001', JSON.stringify(services));
        alert('Services updated successfully!');
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-background text-on-background min-h-screen pb-32 font-body"
        >
            <VendorHeader title="Services" showBack={true} />

            <main className="max-w-xl mx-auto px-6 pt-8 space-y-8">
                {/* Header Section */}
                <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
                    <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[24px]">trending_up</span>
                    </div>
                    <div className="space-y-1">
                        <h2 className="text-lg font-bold text-on-surface tracking-tight">Manage Inventory</h2>
                        <p className="text-xs text-on-surface-variant font-medium leading-relaxed font-body">Set service active/inactive status and update current pricing.</p>
                    </div>
                </section>

                {/* Service List */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-[11px] font-bold text-on-background uppercase tracking-widest">Active Offerings</h3>
                    </div>
                    
                    <div className="space-y-3">
                        {services.map((service, idx) => (
                            <div key={service.id} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between gap-6 transition-all group">
                                <div className="flex items-center gap-4 min-w-0">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${service.active ? 'bg-primary/5 text-primary' : 'bg-surface-container text-outline-variant/30'}`}>
                                        <span className="material-symbols-outlined text-[20px]">{service.icon}</span>
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="text-sm font-bold text-on-surface tracking-tight truncate">{service.name}</h4>
                                        <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">{service.unit}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3 shrink-0">
                                    <div className="relative group/price">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-300 group-hover/price:text-[#3D5AFE] transition-colors">₹</span>
                                        <input 
                                            type="text"
                                            value={service.basePrice}
                                            onChange={(e) => updatePrice(idx, e.target.value)}
                                            className="w-20 pl-6 pr-3 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 focus:bg-white focus:border-[#3D5AFE]/20 transition-all outline-none"
                                        />
                                    </div>
                                    <div 
                                        onClick={() => toggleService(idx)}
                                        className={`w-8 h-4 rounded-full relative cursor-pointer transition-colors ${service.active ? 'bg-green-100' : 'bg-slate-100'}`}
                                    >
                                        <div className={`absolute top-0.5 w-3 h-3 rounded-full shadow-sm transition-all ${service.active ? 'right-0.5 bg-green-500' : 'left-0.5 bg-slate-300'}`}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="pt-8">
                    <button 
                        onClick={handleUpdate}
                        className="w-full py-5 rounded-[2rem] vendor-gradient text-white font-bold text-lg shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-3"
                    >
                        <span className="material-symbols-outlined text-[20px]">check</span>
                        Update Services
                    </button>
                    <p className="mt-6 text-center text-[10px] font-bold text-on-background uppercase tracking-widest">Last updated: Today, 10:45 AM</p>
                </div>
            </main>
        </motion.div>
    );
};

export default ServiceManagement;
