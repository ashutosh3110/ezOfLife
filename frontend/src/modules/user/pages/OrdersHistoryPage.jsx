import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import UserHeader from '../components/UserHeader';
import BottomNav from '../components/BottomNav';

const OrdersHistoryPage = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const [activeTab, setActiveTab] = React.useState('active');

  const activeOrders = [
    { id: '#EZ-8291', status: 'In Progress', date: 'Oct 24, 2026', price: 899.00, progress: 66 }
  ];

  const pastOrders = [
    { id: '#EZ-7104', status: 'Delivered', date: 'Oct 18, 2026', price: 749.00, desc: '2x Heavy Duty Wash, 1x Delicate Care Silk' },
    { id: '#EZ-6552', status: 'Delivered', date: 'Oct 05, 2026', price: 499.00, desc: 'Mixed Casual Load, Scented Finish' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-background text-on-background min-h-[100dvh] flex flex-col"
    >
      <main className="pt-24 pb-44 px-6 max-w-2xl mx-auto w-full">
        {/* Editorial Header Section */}
        <motion.section 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="mb-12 ml-2"
        >
          <span className="font-label text-[10px] uppercase tracking-[0.3em] text-primary font-black opacity-60 mb-2 block">Management Center</span>
          <h2 className="text-4xl md:text-5xl font-black text-on-surface leading-none tracking-tighter mb-10">My Orders</h2>
          
          {/* Custom Modern Tabs */}
          <div className="flex gap-2 p-1.5 bg-white rounded-full w-fit shadow-sm border border-outline-variant/5">
            <motion.button 
              layout
              onClick={() => setActiveTab('active')}
              className={`px-10 py-3 rounded-full font-black text-[10px] uppercase tracking-widest transition-all ${
                activeTab === 'active' 
                  ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' 
                  : 'text-on-surface-variant opacity-60 hover:opacity-100'
              }`}
            >
              Active
            </motion.button>
            <motion.button 
              layout
              onClick={() => setActiveTab('past')}
              className={`px-10 py-3 rounded-full font-black text-[10px] uppercase tracking-widest transition-all ${
                activeTab === 'past' 
                  ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' 
                  : 'text-on-surface-variant opacity-60 hover:opacity-100'
              }`}
            >
              Past
            </motion.button>
          </div>
        </motion.section>

        {/* Orders List */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-10"
        >
          <AnimatePresence mode="wait">
            {activeTab === 'active' ? (
              <motion.div 
                key="active-orders"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-10"
              >
                {activeOrders.map((order) => (
                  <motion.div 
                    key={order.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.01 }}
                    className="bg-white rounded-[2.5rem] p-8 relative overflow-hidden group shadow-xl shadow-primary/5 border border-outline-variant/10"
                  >
                    {/* Status Glow Accent */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700"></div>
                    
                    <div className="flex justify-between items-start mb-8 relative z-10">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <motion.span 
                            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-2.5 h-2.5 rounded-full bg-primary"
                          ></motion.span>
                          <span className="text-primary font-black text-[10px] tracking-[0.2em] uppercase leading-none mt-0.5">Live Processing</span>
                        </div>
                        <h3 className="text-2xl font-black text-on-surface tracking-tighter leading-none">{order.id}</h3>
                        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60 mt-2">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-headline font-black text-primary tracking-tighter leading-none">₹{order.price.toFixed(2)}</p>
                      </div>
                    </div>

                    {/* Progress Streamline */}
                    <div className="mb-10 px-1 relative z-10">
                      <div className="flex justify-between text-[9px] text-on-surface-variant font-black uppercase tracking-widest opacity-60 mb-4">
                        <span>Pickup</span>
                        <span className="text-primary opacity-100">Cleaning</span>
                        <span>Arrival</span>
                      </div>
                      <div className="relative h-2.5 bg-surface-container-low rounded-full overflow-hidden shadow-inner">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${order.progress}%` }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
                          className="absolute top-0 left-0 h-full bg-primary-gradient rounded-full relative"
                        >
                           <motion.div 
                              animate={{ x: ['100%', '-100%'] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                              className="absolute inset-0 bg-white/30 skew-x-12"
                           />
                        </motion.div>
                      </div>
                    </div>

                    <div className="flex gap-4 relative z-10">
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate('/user/tracking')}
                        className="flex-1 bg-primary-gradient text-on-primary py-5 rounded-2xl font-headline font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary/20 flex items-center justify-center gap-3 transition-all"
                      >
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
                        Track Live
                      </motion.button>
                      <motion.button 
                        whileTap={{ scale: 0.9 }}
                        className="p-5 bg-surface-container-low rounded-2xl text-on-surface-variant hover:bg-surface-container transition-colors shadow-inner"
                      >
                        <span className="material-symbols-outlined text-xl">receipt_long</span>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="past-orders"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-10"
              >
                {/* Past Orders Header */}
                <motion.h4 variants={itemVariants} className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant opacity-40 px-4 flex items-center gap-4">
                  Archive
                  <div className="flex-grow h-px bg-outline-variant/10"></div>
                </motion.h4>

                {pastOrders.map((order) => (
                  <motion.div 
                    key={order.id}
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                    className="bg-white/50 backdrop-blur-sm rounded-[2rem] p-8 flex flex-col group border border-outline-variant/10 shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm text-outline-variant">check_circle</span>
                          <span className="text-on-surface-variant/60 font-black text-[10px] tracking-widest uppercase">Verified Delivery</span>
                        </div>
                        <h3 className="text-xl font-black text-on-surface tracking-tighter leading-none">{order.id}</h3>
                        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-40">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-on-surface-variant/40 tracking-tighter leading-none">₹{order.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="bg-surface-container-low/40 rounded-2xl p-5 mb-8 border border-white/50">
                      <p className="text-xs font-bold text-on-surface-variant opacity-70 leading-relaxed italic">{order.desc}</p>
                    </div>
                    <div className="flex gap-3">
                      <motion.button 
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-surface-container text-on-surface py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-outline-variant/20 transition-all flex items-center justify-center gap-2 border border-outline-variant/10 shadow-inner shadow-black/5"
                      >
                        <span className="material-symbols-outlined text-sm">replay</span>
                        Re-execute
                      </motion.button>
                      <motion.button 
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-4 border border-outline-variant/20 text-on-surface-variant/60 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all shadow-sm"
                      >
                        View Invoice
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </motion.div>
  );
};

export default OrdersHistoryPage;
