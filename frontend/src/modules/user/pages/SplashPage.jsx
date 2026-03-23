import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const SplashPage = () => {
  const navigate = useNavigate();
  const bgRef = useRef(null);

  useEffect(() => {
    // GSAP floating animation for background blobs
    const blobs = bgRef.current?.querySelectorAll('.blob');
    if (blobs) {
      blobs.forEach((blob) => {
        gsap.to(blob, {
          x: 'random(-50, 50)',
          y: 'random(-50, 50)',
          duration: 'random(5, 10)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      });
    }
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-surface text-on-surface antialiased overflow-hidden min-h-screen relative flex flex-col"
    >
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        
        {/* Left/Top Half: Brand & Onboarding */}
        <section className="relative flex flex-col items-center justify-between bg-surface-container-lowest z-10 px-6 py-16 lg:py-24 overflow-hidden border-b lg:border-r border-outline-variant/10">
          {/* Background Ambient Accents (Limited to this section) */}
          <div ref={bgRef} className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="blob absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-primary-container/20 rounded-full blur-[100px]"></div>
            <div className="blob absolute bottom-[-5%] left-[-5%] w-[300px] h-[300px] bg-secondary-container/30 rounded-full blur-[80px]"></div>
          </div>

          {/* Logo Cluster */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-20 flex flex-col items-center gap-6 lg:gap-8"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 lg:w-24 lg:h-24 flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-container shadow-2xl relative"
            >
              <span className="material-symbols-outlined text-white text-4xl lg:text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                local_laundry_service
              </span>
              <div className="absolute inset-0 bg-white/10 rounded-2xl blur-sm -z-10"></div>
            </motion.div>
            
            <div className="text-center relative">
              <h1 className="text-4xl lg:text-6xl font-black text-primary tracking-tighter leading-none mb-2 lg:mb-3">Ez of life</h1>
              <p className="font-label text-on-surface-variant tracking-[0.3em] text-[10px] uppercase font-extrabold opacity-70">The Pristine Flow</p>
            </div>
          </motion.div>

          {/* Bottom Onboarding Actions */}
          <div className="relative w-full max-w-[340px] flex flex-col items-center gap-8 lg:gap-10 z-30">
            <div className="w-full flex flex-col items-center gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-center"
              >
                <p className="text-on-surface-variant font-body leading-relaxed text-sm lg:text-md font-medium opacity-80 decoration-primary/20">
                  Elevate your lifestyle with premium fabric care delivered to your doorstep.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="w-full flex flex-col gap-4"
              >
                <motion.button 
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/user/auth')}
                  className="w-full bg-primary-gradient text-on-primary py-4 lg:py-5 rounded-2xl font-headline font-bold text-lg shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-3 group"
                >
                  Get Started
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </motion.button>
                
                <motion.button 
                  whileHover={{ backgroundColor: 'rgba(71, 95, 139, 0.05)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/user/auth')}
                  className="w-full text-primary py-3 rounded-2xl font-headline font-bold text-[10px] tracking-widest uppercase transition-all opacity-60"
                >
                  Already have an account? Log In
                </motion.button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Right/Bottom Half: Sponsor Ad */}
        <section className="relative bg-surface-container-low min-h-[300px] lg:min-h-screen overflow-hidden group cursor-pointer">
          <div className="absolute inset-0 transition-transform duration-[2s] group-hover:scale-105">
            <img 
              alt="Sponsor Advertisement" 
              className="w-full h-full object-cover grayscale opacity-60 mix-blend-multiply group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
              src="/luxury_fabric_sponsor_ad.png" 
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-10 lg:p-16">
            <motion.div 
               initial={{ y: 20, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               className="relative z-10"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[9px] font-black text-white uppercase tracking-[.3em] border border-white/20">Sponsored</span>
                <div className="h-px w-10 bg-white/20"></div>
                <span className="text-white font-headline font-black text-xs uppercase tracking-widest opacity-80">LUMIERE FABRICS</span>
              </div>
              <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tighter leading-[1.1] mb-6">
                Redefinition of <br/>Pure <span className="text-primary-container">Elegance.</span>
              </h2>
              <p className="text-white/60 text-sm font-medium leading-relaxed max-w-sm mb-10 italic">
                Experience the science of aromatherapy and micro-hydration for your finest garments.
              </p>
              
              <button className="flex items-center gap-4 text-white group/btn">
                <span className="font-black text-xs uppercase tracking-widest">Learn More</span>
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-black transition-all">
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </div>
              </button>
            </motion.div>
          </div>
          
          {/* Abstract Glass Accent */}
          <div className="absolute top-10 right-10 w-24 h-24 glass-effect rounded-full -rotate-12 flex items-center justify-center shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="material-symbols-outlined text-white text-3xl">sparkles</span>
          </div>
        </section>
      </div>

      {/* Semantic Decorative Background Logo */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.015] z-0">
        <div className="w-full h-full text-[60vh] font-black flex items-center justify-center select-none text-primary">
          E
        </div>
      </div>
    </motion.div>
  );
};

export default SplashPage;
