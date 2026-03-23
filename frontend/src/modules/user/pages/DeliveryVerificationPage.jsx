import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import UserHeader from '../components/UserHeader';

const DeliveryVerificationPage = () => {
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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-background text-on-background min-h-[100dvh] flex flex-col"
    >

      <main className="flex-1 pt-28 pb-32 px-6 max-w-5xl mx-auto w-full">
        {/* Editorial Header Section */}
        <motion.section 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="py-8 ml-2"
        >
          <p className="font-label text-xs uppercase tracking-[0.3em] text-primary font-black mb-2 opacity-60">Order #EZ-92834</p>
          <h2 className="font-headline text-4xl md:text-5xl font-black tracking-tighter text-on-background leading-none">
            Delivery<br/><span className="text-primary">Verification</span>
          </h2>
        </motion.section>

        {/* Bento Grid Layout for Photo Comparison */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10"
        >
          {/* Pickup Card */}
          <motion.div variants={itemVariants} className="bg-white rounded-[2.5rem] p-8 flex flex-col gap-6 shadow-sm border border-outline-variant/5">
            <div className="flex justify-between items-center">
              <span className="font-headline font-black text-xl text-on-surface tracking-tight">Pickup State</span>
              <span className="px-4 py-1.5 bg-surface-container-high text-on-surface-variant text-[10px] font-black uppercase tracking-widest rounded-full">Before</span>
            </div>
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-inner bg-surface-container">
              <img alt="Pickup" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuASDaPagYSppSpfoedCnxsq-FWr-tLMA3GzGR2lTumMJyLoXwHrQZcZplwfLhDsX390uERkIE20ULk4Ec6ifIduzc2PplK-uARST9JsymUjmuBolkal2si-Cqx4IguCZTPOhej6DzoDnMR9zrVrqPswcQuWwh9KM6D5hpRUtN3FOVc_XqDq4-K_k6Du6Um0a-VzKHD8iHlJ79hbs1IgU_CEL_q9sIxcCvfQIV-y98H7D_MH5QaZgEPCfPgOzpqVybbIy_5WRWBpjSE" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-4 left-5 flex items-center gap-2 text-white">
                <span className="material-symbols-outlined text-sm">schedule</span>
                <span className="text-[10px] font-black uppercase tracking-widest">May 12, 09:15 AM</span>
              </div>
            </div>
            <p className="text-xs font-bold text-on-surface-variant leading-relaxed opacity-70">Official pickup record captured by your rider during initial collection.</p>
          </motion.div>

          {/* Delivery Card */}
          <motion.div variants={itemVariants} className="bg-primary/5 rounded-[2.5rem] p-8 flex flex-col gap-6 shadow-sm border-2 border-primary/10">
            <div className="flex justify-between items-center">
              <span className="font-headline font-black text-xl text-primary tracking-tight">Delivery State</span>
              <span className="px-4 py-1.5 bg-primary text-on-primary text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-primary/20">After</span>
            </div>
            <div className="relative aspect-video rounded-3xl overflow-hidden group cursor-pointer shadow-lg">
              <img alt="Delivery" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAag27rItEwf32cdPygzlEcqV8TV93VByf0J8LSioevGETHxyeIyF15K5lBh3x8EuJTUJGMnodoC3MS2QRviP5POf4njG006mKv8W4OxHp0l8wFDToym12dnoz1YdUnG5XPVVD9vEp2vDaNMebA4R5ZtkPlxAzWG58vIHXih5ZlDj3XPl5izh9TVAq4d4dBNmeXtfBc6J0G9K_sfmk7nhuLKqZYycXp0w4j7bSfTX9fC7NULfFsn-06oLbAJwtu_1t5DiKuJSOCDHo" />
              <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-white text-5xl">zoom_in</span>
              </div>
              <div className="absolute bottom-4 left-5 flex items-center gap-2 text-white">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>done_all</span>
                <span className="text-[10px] font-black uppercase tracking-widest">Delivered Just Now</span>
              </div>
            </div>
            <p className="text-xs font-bold text-on-surface-variant leading-relaxed opacity-70">
              Your garments have been sanitized and neatly packaged for your arrival.
            </p>
          </motion.div>
        </motion.div>

        {/* Package Details Bento */}
        <motion.div 
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-[2.5rem] p-10 mb-12 shadow-sm border border-outline-variant/10 group overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl -mr-12 -mt-12 pointer-events-none"></div>
          <h3 className="font-headline font-black text-2xl mb-10 flex items-center gap-3 tracking-tighter">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-2xl">inventory_2</span>
            </div>
            Package Details
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
            {[
              { label: 'Total Weight', val: '6.4 kg' },
              { label: 'Service Type', val: 'Premium' },
              { label: 'Items Count', val: '18 pcs' }
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-[10px] font-black text-on-surface-variant mb-2 uppercase tracking-widest opacity-50">{stat.label}</p>
                <p className="font-headline font-black text-3xl text-primary leading-none tracking-tighter">{stat.val}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Final Confirmation OTP Section */}
        <motion.section 
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="max-w-md mx-auto text-center py-6"
        >
          <h4 className="font-headline font-black text-2xl tracking-tighter mb-3">Final Confirmation</h4>
          <p className="text-xs font-bold text-on-surface-variant opacity-60 px-8 leading-relaxed mb-10">
            Enter the 4-digit verification code sent to your registered mobile number.
          </p>
          
          <div className="flex justify-center gap-4 mb-12">
            {[4, 8, '', ''].map((val, i) => (
              <motion.input 
                key={i}
                whileFocus={{ scale: 1.05 }}
                className={`w-14 h-18 text-center text-3xl font-black rounded-2xl bg-white border-2 transition-all ${
                  val ? 'border-primary text-primary' : 'border-outline-variant/20 text-on-surface-variant'
                } focus:border-primary focus:ring-0`}
                maxLength="1"
                type="text"
                defaultValue={val}
                placeholder={val ? undefined : '•'}
              />
            ))}
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/user/success-feedback')}
            className="w-full py-6 bg-primary-gradient text-on-primary font-headline font-black text-xl rounded-2xl shadow-2xl shadow-primary/20 flex items-center justify-center gap-3 uppercase tracking-widest"
          >
            Verify & Pay
            <span className="material-symbols-outlined text-2xl">payments</span>
          </motion.button>
          
          <button className="mt-8 text-primary font-black text-[10px] uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">
            Resend Verification Code
          </button>
        </motion.section>
      </main>
    </motion.div>
  );
};

export default DeliveryVerificationPage;
