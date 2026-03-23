import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const AddressesPage = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([
    { id: 1, type: 'Home', address: '249 Editorial Ave, Suite 4B, Pristine Heights, NY 10012', isDefault: true },
    { id: 2, type: 'Office', address: '88 Creative Plaza, 12th Floor, Metro Central, NY 10001', isDefault: false }
  ]);

  const deleteAddress = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

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
          className="mb-8"
        >
          <button 
            onClick={() => navigate('/user/profile')}
            className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest mb-4 opacity-60 hover:opacity-100 transition-opacity"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Profile
          </button>
          <div className="flex items-center justify-between items-start">
            <h1 className="text-4xl md:text-5xl font-black text-on-background leading-none tracking-tighter mb-4">
              Saved <br/><span className="text-primary tracking-tighter">Locales.</span>
            </h1>
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 bg-primary text-on-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20"
            >
              <span className="material-symbols-outlined text-3xl">add</span>
            </motion.button>
          </div>
        </motion.header>

        <div className="space-y-6">
          <AnimatePresence>
            {addresses.map((addr) => (
              <motion.div 
                key={addr.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`bg-white p-8 rounded-[2.5rem] border-2 transition-all group relative overflow-hidden flex flex-col justify-between min-h-[180px] shadow-sm ${
                  addr.isDefault ? 'border-primary shadow-xl shadow-primary/5' : 'border-outline-variant/5'
                }`}
              >
                <div className="flex justify-between items-start relative z-10">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${addr.isDefault ? 'bg-primary text-white' : 'bg-surface-container-low text-on-surface-variant'}`}>
                      <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {addr.type === 'Home' ? 'home' : 'work'}
                      </span>
                    </div>
                    <div>
                      <p className="font-black text-lg text-on-surface tracking-tight leading-none mb-1">{addr.type}</p>
                      {addr.isDefault && <span className="text-[8px] font-black text-primary uppercase tracking-[0.2em]">Primary Pickup</span>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-outline-variant hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-xl">edit</span>
                    </button>
                    {!addr.isDefault && (
                      <button 
                        onClick={() => deleteAddress(addr.id)}
                        className="p-2 text-outline-variant hover:text-error transition-colors"
                      >
                        <span className="material-symbols-outlined text-xl">delete</span>
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-sm font-bold text-on-surface-variant opacity-70 leading-relaxed max-w-[80%] relative z-10">
                  {addr.address}
                </p>

                {/* Aesthetic Background Accent */}
                <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State Mockup */}
        {addresses.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 flex flex-col items-center text-center opacity-40"
          >
            <span className="material-symbols-outlined text-6xl mb-4">wrong_location</span>
            <p className="font-black text-xs uppercase tracking-widest">No addresses saved yet</p>
          </motion.div>
        )}
      </main>
    </motion.div>
  );
};

export default AddressesPage;
