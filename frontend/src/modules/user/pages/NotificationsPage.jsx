import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotificationsPage = () => {
  const navigate = useNavigate();
  
  const notifications = [
    { id: 1, type: 'order', title: 'Pickup Scheduled', desc: 'Rider will arrive between 2:00 PM - 4:00 PM today.', time: '2m ago', unread: true },
    { id: 2, type: 'promo', title: 'Express Freshness Sale', desc: 'Get 20% off on all Silk & Woolen items this weekend.', time: '3h ago', unread: true },
    { id: 3, type: 'service', title: 'System Update', desc: 'New tracking features are now live in your dashboard.', time: '1d ago', unread: false },
    { id: 4, type: 'order', title: 'Order Delivered', desc: 'Your order #EZ-7104 has been safely delivered.', time: '5d ago', unread: false }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-background text-on-background min-h-[100dvh] pb-32"
    >
      <main className="max-w-2xl mx-auto px-6 pt-8">
        <motion.header 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="mb-12"
        >
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest mb-6 opacity-60 hover:opacity-100 transition-opacity"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Dismiss
          </button>
          <div className="flex items-center justify-between">
            <h1 className="text-4xl md:text-5xl font-black text-on-background leading-none tracking-tighter mb-4">
              Flow <br/><span className="text-primary tracking-tighter">Updates.</span>
            </h1>
            <span className="text-[10px] font-black text-primary bg-primary/10 px-4 py-2 rounded-full uppercase tracking-widest">
              2 Unread
            </span>
          </div>
        </motion.header>

        <div className="space-y-4">
          {notifications.map((notif) => (
            <motion.div 
              key={notif.id}
              whileHover={{ x: 5 }}
              className={`p-6 rounded-[2rem] flex items-start gap-5 border transition-all ${
                notif.unread ? 'bg-white border-primary/20 shadow-xl shadow-primary/5' : 'bg-white/40 border-outline-variant/5'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center ${
                notif.type === 'order' ? 'bg-primary/10 text-primary' : 
                notif.type === 'promo' ? 'bg-tertiary/10 text-tertiary' : 
                'bg-secondary/10 text-secondary'
              }`}>
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {notif.type === 'order' ? 'local_shipping' : 
                   notif.type === 'promo' ? 'sell' : 
                   'settings_suggest'}
                </span>
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-black text-[15px] text-on-surface tracking-tight leading-none">{notif.title}</h4>
                  <span className="text-[9px] font-bold text-on-surface-variant opacity-40 uppercase tracking-widest">{notif.time}</span>
                </div>
                <p className="text-xs font-bold text-on-surface-variant opacity-60 leading-relaxed">
                  {notif.desc}
                </p>
              </div>
              {notif.unread && (
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.button 
          whileTap={{ scale: 0.98 }}
          className="w-full mt-10 py-5 rounded-2xl border-2 border-outline-variant/10 text-on-surface-variant/40 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white transition-all shadow-sm"
        >
          Mark all as read
        </motion.button>
      </main>
    </motion.div>
  );
};

export default NotificationsPage;
