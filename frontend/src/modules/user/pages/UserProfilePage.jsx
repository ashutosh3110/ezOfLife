import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import UserHeader from '../components/UserHeader';
import BottomNav from '../components/BottomNav';

const UserProfilePage = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const actions = [
    { title: 'Edit Profile', desc: 'Update name, email, and preferences', icon: 'person_edit', path: '/user/profile/edit' },
    { title: 'Addresses', desc: '2 saved locations for pickup', icon: 'location_on', path: '/user/profile/addresses' },
    { title: 'Payment', desc: 'Manage cards and digital wallets', icon: 'payments', path: '/user/profile/payment' },
    { title: 'History', desc: 'View past cleanings and receipts', icon: 'history', path: '/user/orders' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-background text-on-background min-h-[100dvh] flex flex-col"
    >
      <main className="pt-24 pb-44 px-6 max-w-2xl mx-auto w-full">
        {/* Profile Hero Section: Asymmetric Layout */}
        <motion.section 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="mb-12 relative pt-8 ml-2"
        >
          <div className="flex flex-col gap-2">
            <span className="font-label text-[10px] uppercase tracking-[0.3em] text-primary-dim font-black opacity-60">Architect of Freshness</span>
            <h2 className="font-headline text-5xl font-black text-on-background leading-none tracking-tighter">
              Julian<br/><span className="text-primary tracking-tighter">Mendoza</span>
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-12 gap-5">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="col-span-8 bg-white border border-outline-variant/10 rounded-[2.5rem] p-8 flex flex-col justify-between min-h-[180px] shadow-sm relative overflow-hidden group"
            >
               <motion.span 
                 animate={{ rotate: [0, 10, -10, 0] }}
                 transition={{ duration: 4, repeat: Infinity }}
                 className="material-symbols-outlined text-primary text-4xl" 
                 style={{ fontVariationSettings: "'FILL' 1" }}
               >
                 verified
               </motion.span>
               <div>
                 <p className="text-[10px] font-black font-headline uppercase tracking-widest text-on-surface-variant opacity-60 mb-1">Status Tier</p>
                 <p className="text-on-background font-black text-2xl tracking-tighter">EZ Elite</p>
               </div>
               <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-primary/5 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="col-span-4 bg-primary-gradient rounded-[2.5rem] p-4 flex flex-col items-center justify-center text-center shadow-2xl shadow-primary/20"
            >
              <p className="text-on-primary font-black text-5xl tracking-tighter leading-none mb-2">12</p>
              <p className="text-on-primary font-black text-[9px] uppercase tracking-[0.2em] opacity-80 leading-tight">Elite Orders</p>
            </motion.div>
          </div>
        </motion.section>

        {/* Profile Actions Bento Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {actions.map((action, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              whileHover={{ y: -5, backgroundColor: '#ffffff' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(action.path)}
              className="group bg-white/40 backdrop-blur-sm p-8 rounded-[2.5rem] hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer flex items-start justify-between border border-transparent hover:border-outline-variant/10"
            >
              <div className="space-y-6">
                <div className={`w-14 h-14 rounded-2xl bg-surface-container-low flex items-center justify-center text-primary shadow-inner border border-white/50 group-hover:bg-primary/5 transition-colors`}>
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 0" }}>{action.icon}</span>
                </div>
                <div>
                  <h3 className="font-headline font-black text-xl tracking-tighter text-on-surface leading-none mb-2">{action.title}</h3>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60 leading-relaxed italic">{action.desc}</p>
                </div>
              </div>
              <motion.span 
                 whileHover={{ x: 5 }}
                 className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-all opacity-0 group-hover:opacity-100"
              >
                chevron_right
              </motion.span>
            </motion.div>
          ))}
        </motion.div>

        {/* Support & Safety Section Minimal */}
        <motion.section 
          variants={itemVariants} 
          initial="hidden"
          animate="visible"
          className="mt-16 space-y-4 px-2"
        >
          <h4 className="font-headline font-black text-[10px] uppercase tracking-[0.3em] text-on-surface-variant opacity-40 mb-6">Security & Care</h4>
          
          {[
            { icon: 'help_outline', title: 'Help Center', color: 'primary' },
            { icon: 'security', title: 'Privacy Policy', color: 'tertiary' }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ x: 5 }}
              className="flex items-center justify-between p-6 bg-white rounded-3xl group border border-outline-variant/5 shadow-sm"
            >
              <div className="flex items-center gap-5">
                <div className={`w-11 h-11 rounded-2xl bg-${item.color}/10 flex items-center justify-center text-${item.color}`}>
                  <span className="material-symbols-outlined text-xl">{item.icon}</span>
                </div>
                <span className="font-black text-sm text-on-surface tracking-tight leading-none">{item.title}</span>
              </div>
              <span className="material-symbols-outlined text-outline-variant text-xl group-hover:text-primary transition-colors">open_in_new</span>
            </motion.div>
          ))}

          <motion.button 
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(168, 56, 54, 0.05)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/user/auth')}
            className="w-full mt-10 flex items-center justify-center gap-3 py-6 rounded-2xl border-2 border-error/10 text-error font-black text-sm uppercase tracking-widest transition-all"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
            Terminate Session
          </motion.button>
        </motion.section>
      </main>
    </motion.div>
  );
};

export default UserProfilePage;
