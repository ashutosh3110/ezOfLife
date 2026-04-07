import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { authApi } from '../../../lib/api';

const AdminOtp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { phone } = location.state || { phone: 'ADMIN' };
    
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(30);
    const [error, setError] = useState('');
    const inputRefs = useRef([]);

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => setTimer(prev => prev - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (index, value) => {
        if (isNaN(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleVerify = async () => {
        if (otp.every(digit => digit !== '')) {
            setError('');
            try {
                const fullOtp = otp.join('');
                const response = await authApi.verifyOtp(phone, fullOtp);
                if (response.token) {
                    localStorage.setItem('adminAuth', 'true');
                    localStorage.setItem('adminToken', response.token);
                    localStorage.setItem('adminData', JSON.stringify(response.user));
                    navigate('/admin/dashboard');
                } else {
                    setError(response.message || 'Invalid OTP');
                }
            } catch (err) {
                setError('Verification system failure.');
            }
        }
    };

    const isOtpComplete = useMemo(() => otp.every(digit => digit !== ''), [otp]);

    const containerVariants = useMemo(() => ({
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
    }), []);

    const cardVariants = useMemo(() => ({
        hidden: { scale: 0.9, opacity: 0, y: 20 },
        visible: { scale: 1, opacity: 1, y: 0, transition: { type: "spring", damping: 25, stiffness: 200 } }
    }), []);

    return (
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="bg-background text-on-background min-h-[100dvh] flex flex-col items-center justify-center px-6 relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
                <div className="absolute top-20 right-[-10%] w-80 h-80 bg-primary/5 rounded-full blur-[80px]" />
                <div className="absolute bottom-20 left-[-10%] w-80 h-80 bg-tertiary/5 rounded-full blur-[80px]" />
            </div>

            <motion.main 
                variants={cardVariants}
                className="max-w-md w-full bg-white rounded-[3rem] p-8 md:p-10 shadow-[0_40px_80px_rgba(47,50,58,0.1)] border border-outline-variant/10"
            >
                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-primary-container/30 rounded-3xl flex items-center justify-center text-primary mx-auto mb-6 shadow-inner">
                        <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>admin_panel_settings</span>
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter text-on-surface mb-3 leading-tight italic uppercase">Checkpoint</h1>
                    <p className="text-xs font-bold text-on-surface-variant opacity-60 uppercase tracking-widest leading-none">Security token sent to</p>
                    <p className="text-sm font-black text-primary mt-2 tracking-tight">+91 {phone}</p>
                    {error && <p className="text-[10px] text-error font-bold mt-3 animate-pulse">{error}</p>}
                </div>

                <div className="flex gap-2 mb-10 justify-center">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={el => inputRefs.current[index] = el}
                            className={`w-11 h-16 rounded-2xl bg-surface-container-low border-2 text-center text-2xl font-black transition-all outline-none ${digit ? 'border-primary shadow-lg shadow-black/5' : 'border-slate-200 focus:border-primary/50'}`}
                            type="tel"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                        />
                    ))}
                </div>

                <div className="space-y-6">
                    <motion.button
                        whileTap={isOtpComplete ? { scale: 0.98 } : {}}
                        onClick={handleVerify}
                        disabled={!isOtpComplete}
                        className={`w-full font-headline font-black py-6 rounded-2xl shadow-2xl tracking-[0.2em] uppercase text-[10px] transition-all duration-300 ${isOtpComplete ? 'bg-primary text-on-primary shadow-primary/20 hover:scale-[1.02]' : 'bg-surface-container-high text-on-surface/20 cursor-not-allowed opacity-50'}`}
                    >
                        Authorize Session
                    </motion.button>
                    
                    <div className="text-center">
                        <p className="text-[10px] font-bold text-on-surface-variant opacity-40 uppercase tracking-widest">
                            {timer > 0 ? `Retry dispatch in ${timer}s` : "Dispatcher ready"}
                        </p>
                    </div>
                </div>
            </motion.main>
        </motion.div>
    );
};

export default AdminOtp;
