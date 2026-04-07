import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { authApi } from '../../../lib/api';

const RiderAuth = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [phone, setPhone] = useState('');
    const [apiError, setApiError] = useState('');

    const isValid = phone.length === 10 && /^\d+$/.test(phone);

    const handleAuth = async () => {
        if (!isValid) return;
        setApiError('');
        try {
            const mode = isLogin ? 'login' : 'signup';
            const response = await authApi.requestOtp(phone, 'WhatsApp', mode, 'Rider');
            if (response.message === 'OTP sent successfully') {
                navigate('/rider/otp', { state: { phone, mode } });
            } else {
                setApiError(response.message || 'Something went wrong');
            }
        } catch (err) {
            setApiError('Server error. Please try again.');
        }
    };

    return (
        <div className="bg-slate-950 text-white min-h-[100dvh] flex flex-col font-sans px-6 py-12 items-center justify-center relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-orange-500/20 rounded-full blur-[80px]"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md z-10"
            >
                <div className="flex flex-col items-center mb-10 text-center">
                    <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-orange-500/20">
                        <span className="material-symbols-outlined text-white text-3xl">electric_moped</span>
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter uppercase italic italic">Ez Rider</h1>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mt-2">Delivery Partner Logistics</p>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl">
                    <div className="flex bg-slate-800/50 p-1 rounded-2xl mb-8">
                        <button 
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isLogin ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-slate-400'}`}
                        >
                            Login
                        </button>
                        <button 
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${!isLogin ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-slate-400'}`}
                        >
                            Join Fleet
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-1">Phone Number</label>
                            <div className="flex items-center bg-slate-950 border border-slate-800 rounded-2xl p-4 focus-within:border-orange-500/50 transition-all">
                                <span className="text-slate-500 font-bold mr-3">+91</span>
                                <input 
                                    type="tel"
                                    maxLength={10}
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                                    placeholder="00000 00000"
                                    className="bg-transparent border-none focus:ring-0 w-full text-white font-bold tracking-widest outline-none"
                                />
                            </div>
                        </div>

                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            onClick={handleAuth}
                            disabled={!isValid}
                            className={`w-full py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all shadow-xl ${isValid ? 'bg-orange-500 text-white shadow-orange-500/20' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
                        >
                            {isLogin ? 'Dispatch OTP' : 'Register Vehicle'}
                        </motion.button>

                        {apiError && (
                            <p className="text-[10px] text-rose-500 font-bold text-center animate-pulse uppercase tracking-widest">{apiError}</p>
                        )}
                    </div>
                </div>

                <div className="mt-12 text-center opacity-30">
                    <p className="text-[9px] font-bold uppercase tracking-widest">Secured by Ez-Logistics Protocols</p>
                </div>
            </motion.div>
        </div>
    );
};

export default RiderAuth;
