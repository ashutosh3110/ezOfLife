import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import VendorBottomNav from '../components/VendorBottomNav';
import socket from '../../../lib/socket';
import { orderApi } from '../../../lib/api';
import useNotificationStore from '../../../shared/stores/notificationStore';
import useVendorOrderStore from '../../../shared/stores/vendorOrderStore';

const VendorLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { incomingRequest, setIncomingRequest, clearIncomingRequest } = useVendorOrderStore();
  const [acceptingId, setAcceptingId] = useState(null);
  const [timeLeft, setTimeLeft] = useState(45);
  const { addNotification } = useNotificationStore();

  // Timer logic for incoming request
  useEffect(() => {
    let timer;
    if (incomingRequest) {
      setTimeLeft(45); // Reset timer to 45s for each new request
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            clearIncomingRequest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [incomingRequest, clearIncomingRequest]);

  const vendorData = JSON.parse(localStorage.getItem('vendorData') || '{}');
  const vendorId = vendorData?._id || vendorData?.id;

  const hasShowedToast = React.useRef(false);

  useEffect(() => {
    if (!vendorId) return;

    const handleNewOrder = async (data) => {
      console.log('Global Layout: New order available', data);
      
      setIncomingRequest({
        _id: data.orderId,
        orderId: data.displayId,
        items: [{ name: 'New Order Request', quantity: 1 }],
        specialInstructions: ''
      });

      try {
        const fullDetail = await orderApi.getById(data.orderId);
        setIncomingRequest(fullDetail);
        addNotification('order_available', 'New Order Nearby', `Order ${data.displayId} is available.`, 'vendor');
      } catch (err) {
        console.error('Error fetching full order in layout', err);
      }
    };

    const handleNewNotification = (data) => {
        console.log('⚡ Vendor Socket: New notification received', data);
        if (data.role === 'vendor' || data.recipient === vendorId) {
            addNotification(
                data.notification.type || 'info',
                data.notification.title,
                data.notification.message,
                'vendor',
                { id: data.notification._id }
            );
        }
    };

    const joinRooms = () => {
      // Socket will connect automatically
      socket.emit('join_room', 'vendors_pool');
      if (vendorId) {
          socket.emit('join_room', `user_${vendorId}`);
      }
    };

    joinRooms();

    socket.on('new_order_available', handleNewOrder);
    socket.on('new_notification', handleNewNotification);

    return () => {
      socket.off('new_order_available', handleNewOrder);
      socket.off('new_notification', handleNewNotification);
    };
  }, [vendorId]);

  const handleAccept = async (orderId) => {
    try {
      setAcceptingId(orderId);
      await orderApi.vendorAcceptOrder(orderId, vendorId);
      clearIncomingRequest();
      // Directly navigate to the order details page where address/phone are shown
      navigate(`/vendor/order/${orderId}`);
    } catch (err) {
      alert('Order already taken or error occurred.');
    } finally {
      setAcceptingId(null);
    }
  };

  const noNavPaths = [
    '/vendor/splash',
    '/vendor/auth',
    '/vendor/otp',
    '/vendor/register', 
    '/vendor/upload-documents', 
    '/vendor/approval-pending',
    '/vendor/walk-in',
    '/vendor/promotions'
  ];
  
  const isOrderDetails = location.pathname.includes('/vendor/order/');
  const isRiderVerification = location.pathname.includes('/vendor/rider-verification/');
  
  const showNav = !noNavPaths.some(path => location.pathname === path) && !isOrderDetails && !isRiderVerification;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <main className="flex-1 w-full relative">
        <Outlet />
      </main>

      {/* Global Incoming Request Modal */}
      <AnimatePresence>
        {incomingRequest && (
          <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0a0f18]/90 backdrop-blur-xl"
              onClick={() => clearIncomingRequest()}
            />
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 100 }}
              className="bg-white w-full max-w-md rounded-[3rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] border border-slate-100 relative z-[5001] overflow-y-auto max-h-[92vh] hide-scrollbar"
            >
              {/* Theme Bar */}
              <div className="h-2 bg-[#73e0c9] sticky top-0 z-20"></div>
              
              <div className="p-7 space-y-6">
                {/* Header: Timer & ID */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-rose-500/10 rounded-xl border border-rose-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                    <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest whitespace-nowrap">
                        Expires in 00:{timeLeft.toString().padStart(2, '0')}
                    </p>
                  </div>
                  <span className="bg-slate-900 text-white px-4 py-1.5 rounded-xl text-[10px] font-black tracking-[0.15em] uppercase shadow-sm">
                    {incomingRequest.orderId}
                  </span>
                </div>

                {/* Primary Title & Order Type */}
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-20 h-20 rounded-[2rem] bg-[#73e0c9]/10 flex items-center justify-center text-[#73e0c9] shadow-inner">
                    <span className="material-symbols-outlined text-4xl animate-bounce">notifications_active</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-3">
                        <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">New Request</h3>
                        <span className={`px-2.5 py-1 ${incomingRequest.isExpress ? 'bg-[#73e0c9] text-white shadow-lg shadow-[#73e0c9]/20' : 'bg-slate-100 text-slate-400'} rounded-lg text-[8px] font-black uppercase tracking-widest`}>
                            {incomingRequest.isExpress ? '⚡ Express' : 'Standard'}
                        </span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-[14px] text-[#73e0c9]">distance</span>
                      {incomingRequest.distance || '1.8'} KM Away • {incomingRequest.address?.split(',')[0]}
                    </p>
                  </div>
                </div>

                {/* Logistics Info Card */}
                <div className="bg-slate-50 rounded-[3rem] p-6 border border-slate-100 space-y-5">
                  {/* Pickup Slot Row */}
                  <div className="flex items-center gap-4 bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
                    <div className="w-12 h-12 rounded-2xl bg-[#73e0c9]/10 flex items-center justify-center text-[#73e0c9]">
                      <span className="material-symbols-outlined text-2xl">schedule</span>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Pickup Slot</p>
                      <h4 className="text-[13px] font-black text-slate-900 leading-none mt-1">
                        {typeof incomingRequest.pickupSlot === 'object' && incomingRequest.pickupSlot?.time 
                            ? `${incomingRequest.pickupSlot.date} | ${incomingRequest.pickupSlot.time}` 
                            : incomingRequest.pickupSlot || '3:00 PM - 4:00 PM'}
                      </h4>
                    </div>
                  </div>

                  {/* Service & Load Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 bg-white/50 p-4 rounded-3xl border border-slate-100">
                      <span className="material-symbols-outlined text-xl text-[#73e0c9]">local_laundry_service</span>
                      <div className="min-w-0">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Service</p>
                        <p className="text-[11px] font-black text-slate-900 truncate mt-1 leading-none">
                            {incomingRequest.items[0]?.name || 'Full Wash'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white/50 p-4 rounded-3xl border border-slate-100">
                      <span className="material-symbols-outlined text-xl text-[#73e0c9]">layers</span>
                      <div className="min-w-0">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Load</p>
                        <p className="text-[11px] font-black text-slate-900 truncate mt-1 leading-none">
                            {incomingRequest.items.reduce((acc, i) => acc + i.quantity, 0)} Items
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Special Instructions & Indicators */}
                  <div className="pt-2 space-y-4">
                    <div className="bg-[#73e0c9]/5 p-4 rounded-2xl border border-[#73e0c9]/10">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-sm text-amber-500">sticky_note_2</span>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Special Instruction</p>
                      </div>
                      <p className="text-xs font-bold text-slate-600 leading-relaxed italic">
                        {incomingRequest.specialInstructions || '"Handle with care, premium fabrics"'}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest px-1">
                        <div className="flex items-center gap-2 text-slate-400">
                            <span className="material-symbols-outlined text-[14px]">account_balance_wallet</span>
                            Payment After Delivery
                        </div>
                        <div className="flex items-center gap-1.5 text-[#73e0c9]">
                            <span className="material-symbols-outlined text-[14px]">photo_library</span>
                            2 Photos Attached
                        </div>
                    </div>
                  </div>

                  {/* Earnings Highlight */}
                  <div className="bg-slate-900 p-6 rounded-[2rem] flex items-center justify-between shadow-xl">
                    <div>
                        <p className="text-[9px] font-black text-[#73e0c9] uppercase tracking-widest leading-none">Estimated Earnings</p>
                        <p className="text-2xl font-black text-white tracking-tighter mt-1 leading-none">₹{(incomingRequest.totalAmount * 0.9).toFixed(0)}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[9px] font-black text-white/30 uppercase tracking-widest leading-none">Total Value</p>
                        <p className="text-sm font-black text-white/50 line-through mt-1 leading-none">₹{incomingRequest.totalAmount?.toFixed(0)}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => handleAccept(incomingRequest._id)}
                    disabled={acceptingId === incomingRequest._id}
                    className="w-full py-5 rounded-[1.5rem] bg-slate-950 text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all flex items-center justify-center gap-4 group"
                  >
                    {acceptingId === incomingRequest._id ? 'Processing...' : 'Accept Order'}
                    <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                  <button
                    onClick={() => clearIncomingRequest()}
                    className="w-full py-4 rounded-[1.5rem] bg-slate-100 text-slate-400 font-bold text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
                  >
                    Not Now
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {showNav && <VendorBottomNav />}
    </div>
  );
};

export default VendorLayout;
