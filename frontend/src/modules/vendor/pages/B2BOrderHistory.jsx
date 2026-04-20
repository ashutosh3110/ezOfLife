import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { b2bOrderApi } from '../../../lib/api';
import VendorHeader from '../components/VendorHeader';

const B2BOrderHistory = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const vendorDataRaw = localStorage.getItem('vendorData') || localStorage.getItem('user') || localStorage.getItem('userData') || '{}';
    const vendorData = JSON.parse(vendorDataRaw);
    const vendorId = vendorData._id || vendorData.id || vendorData.user?._id || vendorData.user?.id;

    useEffect(() => {
        if (!vendorId) return;
        const fetchOrders = async () => {
            try {
                const data = await b2bOrderApi.getVendorOrders(vendorId);
                setOrders(data);
            } catch (err) {
                console.error('Fetch B2B Orders Error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [vendorId]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-amber-500 text-white';
            case 'Accepted': return 'bg-blue-600 text-white';
            case 'Dispatched': return 'bg-indigo-600 text-white';
            case 'Delivered': return 'bg-green-600 text-white';
            default: return 'bg-slate-500 text-white';
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#F8FAFC] min-h-screen pb-32 font-sans"
        >
            <VendorHeader />
            
            <main className="max-w-xl mx-auto px-6 pt-8 space-y-8">
                <header>
                    <h2 className="text-3xl font-black tracking-tighter text-slate-900 leading-none">Material <br/><span className="text-primary italic">Requisitions.</span></h2>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-3">Track your supply chain fulfillment</p>
                </header>

                <div className="space-y-4">
                    {loading ? (
                        <div className="py-20 flex flex-col items-center justify-center gap-4 opacity-40">
                            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-[10px] font-black uppercase tracking-widest">Fetching Order History...</p>
                        </div>
                    ) : orders.length > 0 ? (
                        <AnimatePresence>
                            {orders.map((order, i) => (
                                <motion.div
                                    key={order._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white rounded-[2.5rem] p-7 border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group hover:border-primary/20 transition-all"
                                >
                                    <div className="flex justify-between items-start gap-4 mb-6">
                                        {/* Order Info */}
                                        <div className="flex items-start gap-4 flex-1 min-w-0">
                                            <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-primary shrink-0 border border-slate-100 shadow-inner">
                                                <span className="material-symbols-outlined text-2xl">inventory_2</span>
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Batch ID: {order._id.slice(-8).toUpperCase()}</p>
                                                <h4 className="text-xl font-black text-slate-900 tracking-tight leading-none mb-1.5 truncate pr-2">{order.items[0]?.name || 'Bulk Materials'}</h4>
                                                <div className="flex items-center gap-2 text-slate-500">
                                                    <span className="material-symbols-outlined text-sm">local_shipping</span>
                                                    <p className="text-[10px] font-bold uppercase tracking-wide truncate">
                                                        From: {order.supplier?.supplierDetails?.businessName || 'Assigned Supplier'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Status Badge */}
                                        <div className="shrink-0">
                                            <span className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm inline-block ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-6">

                                        {/* Nested Items Grid */}
                                        <div className="bg-slate-50 rounded-3xl p-5 space-y-3 border border-slate-100">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="flex justify-between items-center">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-2 h-2 rounded-full bg-primary/30"></div>
                                                        <span className="text-[11px] font-bold text-slate-600">{item.name}</span>
                                                    </div>
                                                    <span className="text-[10px] font-black text-slate-400 uppercase">Qty: {item.quantity}</span>
                                                </div>
                                            ))}
                                            <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                                                <span className="text-[10px] font-black text-slate-400 uppercase">Settlement Value</span>
                                                <span className="text-md font-black text-slate-900 tracking-tighter italic">₹{order.totalAmount.toLocaleString()}</span>
                                            </div>
                                        </div>

                                        {/* Timeline Footer */}
                                        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-md text-slate-300">calendar_today</span>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                    Placed: {new Date(order.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                            <button 
                                                onClick={() => navigate(`/vendor/fulfillment`)}
                                                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-primary-gradient hover:text-white transition-all shadow-sm group-hover:scale-110"
                                            >
                                                <span className="material-symbols-outlined text-sm">open_in_new</span>
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    ) : (
                        <div className="bg-white rounded-[3rem] p-20 text-center border-4 border-dashed border-slate-100 flex flex-col items-center">
                            <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center text-slate-100 mb-6">
                                <span className="material-symbols-outlined text-6xl">shopping_cart_off</span>
                            </div>
                            <h3 className="text-xl font-black text-slate-300 uppercase tracking-widest mb-3">No Material Orders</h3>
                            <p className="text-[10px] font-black text-slate-200 uppercase tracking-[0.3em] max-w-[200px] leading-relaxed">
                                You haven't placed any requisitions from the supply pool yet.
                            </p>
                            <button 
                                onClick={() => navigate('/vendor/fulfillment')}
                                className="mt-8 px-8 py-4 bg-primary-gradient text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                            >
                                Shop Materials
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </motion.div>
    );
};

export default B2BOrderHistory;
