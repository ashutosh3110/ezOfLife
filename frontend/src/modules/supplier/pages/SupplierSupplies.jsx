import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const SupplierSupplies = () => {
    const navigate = useNavigate();

    const initialRates = useMemo(() => [
        { id: 1, name: 'Detergent', unit: 'KG', baseRate: 52, lastQuoted: 48, icon: 'wash', lastUpdated: '2 days ago', inStock: true },
        { id: 2, name: 'Laundry Bags', unit: 'Piece', baseRate: 4, lastQuoted: 3.8, icon: 'shopping_bag', lastUpdated: '5 days ago', inStock: false },
        { id: 3, name: 'Softener', unit: 'Ltr', baseRate: 95, lastQuoted: 92, icon: 'water_drop', lastUpdated: '1 week ago', inStock: true },
        { id: 4, name: 'Packaging Roll', unit: 'Roll', baseRate: 120, lastQuoted: 115, icon: 'inventory', lastUpdated: '3 days ago', inStock: true },
    ], []);

    const [rates, setRates] = useState(initialRates);
    const [isSaving, setIsSaving] = useState(false);

    const handleRateChange = (id, newRate) => {
        setRates(prev => prev.map(item => item.id === id ? { ...item, baseRate: parseFloat(newRate) || 0 } : item));
    };

    const toggleStock = (id) => {
        setRates(prev => prev.map(item => {
            if (item.id === id) {
                const newStatus = !item.inStock;
                toast.success(`${item.name} marked as ${newStatus ? 'In Stock' : 'Out of Stock'}`);
                return { ...item, inStock: newStatus };
            }
            return item;
        }));
    };

    const handleSync = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            toast.success('Inventory & Rates Synced with Vendors!');
        }, 1500);
    };

    return (
        <div className="bg-[#F8FAFC] text-slate-900 min-h-screen pb-48 font-sans">
            {/* STICKY HEADER */}
            <header className="px-6 pt-12 mb-8 max-w-md mx-auto sticky top-0 bg-[#F8FAFC]/80 backdrop-blur-xl z-40 pb-4 border-b border-slate-100">
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-black tracking-tighter text-slate-950 uppercase leading-none">Supplies.</h1>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-2 ml-1">Inventory & Rates Hub</p>
                    </div>
                    <motion.button 
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-900"
                    >
                        <span className="material-symbols-outlined text-2xl">add_circle</span>
                    </motion.button>
                </div>
            </header>

            <main className="px-6 space-y-8 max-w-md mx-auto">
                {/* 1. OPERATIONS & LOGISTICS */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Operations & Logistics</h3>
                        <span className="material-symbols-outlined text-slate-300 text-sm">hub</span>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <motion.div 
                            whileHover={{ scale: 1.01 }}
                            className="bg-slate-900 rounded-[2.5rem] p-7 shadow-2xl shadow-slate-900/20 relative overflow-hidden group cursor-pointer"
                            onClick={() => {
                                toast.success('Aggregated Manifest Generated!');
                            }}
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[60px] -mr-16 -mt-16"></div>
                            <div className="relative z-10 flex items-center justify-between">
                                <div className="space-y-1.5">
                                    <h2 className="text-xl font-black text-white tracking-tight uppercase">Aggregated Manifest</h2>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed max-w-[200px]">
                                        Consolidated picking list for current batch orders.
                                    </p>
                                </div>
                                <div className="w-14 h-14 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center text-white">
                                    <span className="material-symbols-outlined text-2xl">download_for_offline</span>
                                </div>
                            </div>
                            <div className="mt-6 pt-5 border-t border-white/5 flex gap-4">
                                {[
                                    { val: '450 KG', label: 'Detergent' },
                                    { val: '1200 Pcs', label: 'Bags' },
                                    { val: '80 Ltr', label: 'Softener' }
                                ].map((stat, i) => (
                                    <div key={i} className="flex-1">
                                        <p className="text-[10px] font-black text-white leading-none">{stat.val}</p>
                                        <p className="text-[7px] font-bold text-slate-500 uppercase tracking-widest mt-1">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* 2. ORDER FULFILLMENT STATUS */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Fulfillment</h3>
                        <span className="material-symbols-outlined text-slate-300 text-sm">local_shipping</span>
                    </div>

                    {[
                        { id: '#2201', hub: 'South Hub - Indore', items: '450KG Detergent', status: 'Dispatched' },
                        { id: '#2202', hub: 'Heritage Hub - Ujjain', items: '1200 Bags, 80L Softener', status: 'Processing' }
                    ].map((order, i) => (
                        <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-5">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="bg-slate-100 text-slate-900 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest">{order.id}</span>
                                    <h4 className="text-sm font-black text-slate-900 mt-2">{order.hub}</h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">{order.items}</p>
                                </div>
                                <span className={`px-3 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest ${
                                    order.status === 'Dispatched' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-blue-50 text-blue-600 border border-blue-100'
                                }`}>
                                    {order.status}
                                </span>
                            </div>

                            <div className="grid grid-cols-3 gap-2 pt-2">
                                {['Processing', 'Dispatched', 'Delivered'].map((st) => (
                                    <button 
                                        key={st}
                                        onClick={() => toast.success(`Order ${order.id} marked as ${st}`)}
                                        className={`py-3 rounded-xl text-[7px] font-black uppercase tracking-widest border transition-all ${
                                            order.status === st ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'bg-slate-50 text-slate-400 border-slate-100 hover:border-slate-300'
                                        }`}
                                    >
                                        {st}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>

                {/* 3. INVENTORY RATE CARD */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Wholesale Base Rates (Rb)</h3>
                        <span className="material-symbols-outlined text-slate-300 text-sm">payments</span>
                    </div>
                    <div className="space-y-4">
                        <AnimatePresence>
                            {rates.map((item, idx) => (
                                <motion.div 
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className={`bg-white p-6 rounded-[2.8rem] border border-slate-100 shadow-sm space-y-6 relative overflow-hidden group transition-all ${!item.inStock ? 'grayscale opacity-60' : ''}`}
                                >
                                    {/* Product Info Section */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-5">
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border border-slate-100 transition-all duration-500 ${item.inStock ? 'bg-slate-50 text-slate-900 group-hover:bg-slate-900 group-hover:text-white' : 'bg-slate-100 text-slate-300'}`}>
                                                <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="text-lg font-black text-slate-900 tracking-tight leading-none">{item.name}</h4>
                                                    <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">{item.lastUpdated}</span>
                                                </div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5 flex items-center gap-2">
                                                    Billed Per {item.unit}
                                                    <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                                                    <span className={item.inStock ? 'text-emerald-500' : 'text-rose-500'}>{item.inStock ? 'In Stock' : 'Out of Stock'}</span>
                                                </p>
                                            </div>
                                        </div>

                                        {/* INVENTORY TOGGLE */}
                                        <div 
                                            onClick={() => toggleStock(item.id)}
                                            className={`w-12 h-6 rounded-full relative transition-all duration-300 shadow-inner cursor-pointer ${item.inStock ? 'bg-emerald-500' : 'bg-slate-200'}`}
                                        >
                                            <motion.div 
                                                animate={{ x: item.inStock ? 26 : 4 }}
                                                className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
                                            />
                                        </div>
                                    </div>

                                    {/* Dynamic Pricing Grid */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Wholesale Base Rate (Rb)</p>
                                            <div className="relative group/input">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 group-focus-within/input:text-slate-950 transition-colors">₹</span>
                                                <input 
                                                    type="number"
                                                    disabled={!item.inStock}
                                                    value={item.baseRate}
                                                    onChange={(e) => handleRateChange(item.id, e.target.value)}
                                                    className="w-full pl-8 pr-4 py-4 bg-slate-50 rounded-2xl text-[13px] font-black text-slate-900 focus:bg-white border-2 border-transparent focus:border-slate-950 transition-all outline-none shadow-inner disabled:cursor-not-allowed"
                                                />
                                            </div>
                                        </div>
                                        
                                        {/* LAST QUOTED CARD */}
                                        <div className="bg-slate-950 rounded-[1.8rem] p-4 flex flex-col justify-center shadow-xl relative overflow-hidden">
                                            <div className="absolute -right-4 -top-4 w-12 h-12 bg-white/5 rounded-full blur-xl animate-pulse"></div>
                                            <p className="text-[7px] font-black text-white/40 uppercase tracking-widest leading-none mb-1.5">Last Quoted (Ref)</p>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-[10px] font-black text-white/60">₹</span>
                                                <p className="text-xl font-black text-white tracking-tighter leading-none">{item.lastQuoted}</p>
                                            </div>
                                            <div className="mt-3 flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-lg w-fit">
                                                <span className="material-symbols-outlined text-[8px] text-emerald-400">history</span>
                                                <span className="text-[7px] font-black text-white/60 uppercase tracking-tighter">Prev Rate</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Footer Insight */}
                    <div className="bg-slate-50 p-7 rounded-[2.5rem] border border-slate-100 flex gap-5">
                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                            <span className="material-symbols-outlined text-xl">insights</span>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 leading-relaxed uppercase tracking-[0.1em]">
                            Wholesale Base Rates (Rb) are live for all vendors once updated. Out of Stock items will be hidden from vendor catalogs in the next cycle.
                        </p>
                    </div>
                </section>
            </main>

            {/* Sync Action Button */}
            <div className="fixed bottom-28 left-0 right-0 p-6 z-50 flex justify-center">
                <motion.button 
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSync}
                    disabled={isSaving}
                    className="w-full max-w-md py-6 bg-slate-950 text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex items-center justify-center gap-3 transition-all active:scale-95 border border-white/10"
                >
                    {isSaving ? (
                        <>
                            <motion.span 
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                className="material-symbols-outlined text-lg"
                            >
                                sync
                            </motion.span>
                            Updating Rates...
                        </>
                    ) : (
                        <>
                            <span className="material-symbols-outlined text-lg">publish</span>
                            Submit & Update Base Rates
                        </>
                    )}
                </motion.button>
            </div>
        </div>
    );
};

export default SupplierSupplies;
