import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import VendorHeader from '../components/VendorHeader';

const VendorNotifications = () => {
    const navigate = useNavigate();

    const notifications = [
        { id: 1, icon: 'shopping_bag', title: 'New Order Assigned', desc: 'Order #EZ-8830 has been assigned to you by dispatch', time: '5 min ago', type: 'order', unread: true },
        { id: 2, icon: 'payments', title: 'Payout Received', desc: '₹2,450 has been credited to your registered bank account', time: '2 hours ago', type: 'payout', unread: true },
        { id: 3, icon: 'star', title: 'New Rating Received', desc: 'Priya Menon rated your service 5 stars — "Pristine finish!"', time: '5 hours ago', type: 'rating', unread: false },
        { id: 4, icon: 'local_shipping', title: 'Pickup Scheduled', desc: 'Rider Arjun has been assigned for Order #EZ-8821 pickup', time: 'Yesterday', type: 'pickup', unread: false },
        { id: 5, icon: 'verified_user', title: 'Verification Complete', desc: 'Your shop documents have been verified successfully', time: '2 days ago', type: 'system', unread: false },
    ];

    const iconColors = {
        order: 'bg-primary/10 text-primary',
        payout: 'bg-green-50 text-green-600',
        rating: 'bg-amber-50 text-amber-500',
        pickup: 'bg-secondary/10 text-secondary',
        system: 'bg-purple-50 text-purple-500',
    };

    return (
        <div className="bg-surface text-on-surface min-h-screen">
            <VendorHeader title="Notifications" showBack={true} />

            <motion.main 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto px-6 py-8 space-y-4"
            >
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">Today</span>
                    <button className="text-primary font-black text-xs uppercase tracking-widest">Mark all read</button>
                </div>

                {notifications.map((notif, i) => (
                    <motion.div 
                        key={notif.id}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07 }}
                        whileHover={{ x: 6 }}
                        className={`flex items-start gap-5 p-6 rounded-2xl border transition-all cursor-pointer ${notif.unread ? 'bg-white border-primary/10 shadow-md shadow-primary/5' : 'bg-surface-container-low border-outline-variant/5 shadow-sm'}`}
                    >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${iconColors[notif.type]}`}>
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{notif.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3">
                                <p className={`font-headline font-bold leading-tight ${notif.unread ? 'text-on-surface' : 'text-on-surface-variant'}`}>{notif.title}</p>
                                {notif.unread && <span className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0"></span>}
                            </div>
                            <p className="text-sm text-on-surface-variant font-medium mt-1 leading-relaxed">{notif.desc}</p>
                            <p className="text-[10px] text-on-surface-variant/50 font-bold uppercase tracking-widest mt-2">{notif.time}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.main>
        </div>
    );
};

export default VendorNotifications;
