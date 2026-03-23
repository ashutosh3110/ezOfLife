import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="bg-background text-on-surface min-h-[100dvh] flex flex-col">
      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 pt-24 pb-36 px-6 max-w-5xl mx-auto w-full overflow-y-auto hide-scrollbar"
      >
        {/* Search Bar */}
        <motion.div variants={cardVariants} className="mb-8">
          <div className="relative flex items-center bg-white rounded-3xl px-6 py-4 shadow-sm border border-outline-variant/5 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
            <span className="material-symbols-outlined text-outline mr-3">search</span>
            <input 
              className="bg-transparent border-none focus:ring-0 p-0 text-md w-full placeholder:text-outline-variant font-semibold" 
              placeholder="How can we help today?" 
              type="text"
            />
          </div>
        </motion.div>

        {/* Promotional Banner */}
        <motion.section variants={cardVariants} className="mb-10 w-full">
          <div className="grid grid-cols-1 gap-4">
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-primary-gradient rounded-3xl p-8 relative overflow-hidden flex flex-col justify-end min-h-[220px] shadow-xl shadow-primary/10"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-12 -mt-12 blur-3xl"></div>
              <div className="relative z-10">
                <span className="text-on-primary/70 text-[10px] font-extrabold uppercase tracking-[0.2em] mb-2 block">Limited Era</span>
                <h2 className="text-3xl font-black text-on-primary mb-5 leading-[1.1] tracking-tight">30% Off Your<br/>First Order</h2>
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-primary px-6 py-2.5 rounded-full font-bold text-xs inline-flex items-center gap-2 shadow-lg"
                >
                  Boost Now <span className="material-symbols-outlined text-sm">bolt</span>
                </motion.button>
              </div>
              <div className="absolute right-6 bottom-6 opacity-20 rotate-12">
                <span className="material-symbols-outlined text-9xl text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Select Care */}
        <motion.section variants={cardVariants} className="mb-10 w-full">
          <div className="flex justify-between items-end mb-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-black">Categories</span>
              <h2 className="text-3xl font-black tracking-tighter leading-tight">Choose Care</h2>
            </div>
            <button 
              onClick={() => navigate('/user/services')}
              className="text-[10px] uppercase font-black text-primary tracking-widest border border-primary/20 px-4 py-2 rounded-full hover:bg-primary/5 transition-colors"
            >
              View All
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Top Service */}
            <motion.div 
              variants={cardVariants}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/user/service-info', { 
                state: { 
                  selectedService: { id: 'wash_fold', title: 'Wash & Fold', desc: 'Everyday wear, scented & stacked', icon: 'local_laundry_service', color: 'primary', price: '₹99.00' } 
                } 
              })}
              className="bg-white rounded-3xl p-6.5 border border-outline-variant/10 shadow-sm flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-primary-container flex items-center justify-center text-primary shadow-sm shadow-primary/5">
                  <span className="material-symbols-outlined text-3xl">local_laundry_service</span>
                </div>
                <div>
                  <h3 className="font-headline font-black text-lg text-on-surface">Wash & Fold</h3>
                  <p className="text-on-surface-variant text-xs font-semibold">24h Express Turnaround</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">chevron_right</span>
            </motion.div>

            {/* Other Services Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'dry_clean', label: 'Dry Clean', icon: 'dry_cleaning', color: 'tertiary', desc: 'Suits & Silk', price: '₹149.00' },
                { id: 'ironing', label: 'Ironing', icon: 'iron', color: 'secondary', desc: 'Crisp Finish', price: '₹49.00' },
                { id: 'shoe_spa', label: 'Shoe Spa', icon: 'steps', color: 'primary', desc: 'Restoration', price: '₹199.00' }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  variants={cardVariants}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => navigate('/user/service-info', { 
                    state: { 
                      selectedService: { id: item.id, title: item.label, desc: item.desc, icon: item.icon, color: item.color, price: item.price } 
                    } 
                  })}
                  className="bg-surface-container-low rounded-3xl p-5 flex flex-col gap-4 border border-outline-variant/5 shadow-sm group cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-${item.color} shadow-sm group-hover:bg-${item.color} group-hover:text-white transition-all`}>
                    <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-headline font-black text-[15px] leading-none mb-1">{item.label}</h4>
                    <p className="text-[11px] text-on-surface-variant font-bold opacity-60 leading-none">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
              
              <motion.div 
                variants={cardVariants}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/user/services')}
                className="bg-primary-container/20 rounded-3xl p-5 flex flex-col items-center justify-center gap-2 border border-primary/10 shadow-sm group cursor-pointer text-center"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                  <span className="material-symbols-outlined text-xl">grid_view</span>
                </div>
                <p className="text-[11px] font-black text-primary uppercase tracking-widest mt-1">Explore More</p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Express Booking */}
        <motion.section variants={cardVariants} className="w-full">
          <div className="bg-white rounded-[2rem] p-7 border border-outline-variant/10 shadow-[0_32px_32px_rgba(47,50,58,0.06)] relative overflow-hidden">
            <div className="flex flex-col gap-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">bolt</span>
                </div>
                <div>
                  <h3 className="font-black text-xl tracking-tight">Express Pickup</h3>
                  <p className="text-on-surface-variant text-xs font-bold opacity-60 uppercase tracking-widest">Under 60 mins</p>
                </div>
              </div>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/user/service-info', { 
                  state: { 
                    selectedService: { id: 'wash_express', title: 'Wash & Fold (Express)', desc: 'Priority turnaround', icon: 'bolt', color: 'primary', price: '₹199.00' } 
                  } 
                })}
                className="bg-primary text-on-primary w-full py-4 rounded-2xl font-black text-sm tracking-widest uppercase shadow-lg shadow-primary/20"
              >
                Book Now
              </motion.button>
            </div>
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
          </div>
        </motion.section>
      </motion.main>
    </div>
  );
};

export default HomePage;
