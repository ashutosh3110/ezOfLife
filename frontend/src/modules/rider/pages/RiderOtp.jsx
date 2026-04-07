import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { authApi } from '../../../lib/api';

const RiderOtp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { phone } = location.state || { phone: '98765 43210' };
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const inputRefs = useRef([]);

    const handleInput = (index, value) => {
        if (value.length > 1) value = value[value.length - 1];
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
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
        if (otp.every(v => v !== '')) {
            setError('');
            try {
                const fullOtp = otp.join('');
                const response = await authApi.verifyOtp(phone, fullOtp);
                if (response.token) {
                    localStorage.setItem('riderToken', response.token);
                    localStorage.setItem('riderData', JSON.stringify(response.user));
                    navigate('/rider/dashboard');
                } else {
                    setError(response.message || 'Invalid OTP');
                }
            } catch (err) {
                setError('Verification failed');
            }
        }
    };

    const isComplete = otp.every(v => v !== '');

    return (
        <div className="bg-slate-950 text-white min-h-[100dvh] flex flex-col font-sans px-6 py-12 items-center justify-center relative overflow-hidden">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md z-10"
            >
                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl text-center">
                    <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-orange-500/20">
                        <span className="material-symbols-outlined text-orange-500 text-3xl animate-pulse">lock_person</span>
                    </div>

                    <h1 className="text-3xl font-black tracking-tighter uppercase italic text-orange-500">Checkpoint</h1>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-loose mb-1 opacity-60">
                        6-digit verification code sent to your mobile device.
                    </p>
                    <p className="text-sm font-black text-white mb-8 tracking-widest">+91 {phone}</p>

                    <div className="flex gap-2 justify-center mb-10">
                        {otp.map((digit, i) => (
                            <input
                                key={i}
                                ref={el => inputRefs.current[i] = el}
                                type="tel"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleInput(i, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(i, e)}
                                className="w-10 h-14 bg-slate-950 border border-slate-800 focus:border-orange-500/50 rounded-xl text-center text-xl font-black text-white outline-none transition-all"
                            />
                        ))}
                    </div>

                    <motion.button
                        whileTap={isComplete ? { scale: 0.98 } : {}}
                        onClick={handleVerify}
                        disabled={!isComplete}
                        className={`w-full font-headline font-black py-5 rounded-2xl shadow-xl tracking-[0.2em] uppercase text-[10px] transition-all duration-300 mb-8 ${isComplete ? 'bg-orange-500 text-white shadow-orange-500/20' : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-40'}`}
                    >
                        Confirm Dispatch
                    </motion.button>
                    
                    {error && <p className="text-[10px] text-rose-500 font-bold mb-4 animate-pulse uppercase tracking-widest">{error}</p>}

                    <button 
                        onClick={() => navigate(-1)}
                        className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors"
                    >
                        Change Terminal
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default RiderOtp;
