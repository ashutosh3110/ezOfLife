import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../../lib/api';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const RegisterAsSupplierPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    supplierName: '',
    businessName: '',
    address: '',
    city: '',
    pincode: '',
    gst: '',
    location: { lat: 0, lng: 0 },
    bankDetails: {
        accountHolderName: '',
        accountNumber: '',
        ifscCode: '',
        bankName: ''
    },
    documents: {
        gstCert: null,
        udyogAadhar: null,
        aadharCard: null,
        addressProof: null
    }
  });

  const [detecting, setDetecting] = useState(false);

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
        setFormData(prev => ({
            ...prev,
            documents: {
                ...prev.documents,
                [field]: file
            }
        }));
    }
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
        return toast.error('Geolocation is not supported by your browser');
    }
    
    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                // Reverse Geocoding via Google Maps API
                const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
                const response = await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
                );
                const data = await response.json();

                if (data.status === 'OK' && data.results.length > 0) {
                    const result = data.results[0];
                    const addressComponents = result.address_components;
                    
                    let city = '';
                    let pincode = '';
                    
                    addressComponents.forEach(comp => {
                        if (comp.types.includes('locality')) city = comp.long_name;
                        if (comp.types.includes('postal_code')) pincode = comp.long_name;
                        // Fallback for city if locality is missing
                        if (!city && comp.types.includes('administrative_area_level_2')) city = comp.long_name;
                    });

                    setFormData(prev => ({
                        ...prev,
                        location: { lat: latitude, lng: longitude },
                        address: result.formatted_address,
                        city: city || prev.city,
                        pincode: pincode || prev.pincode
                    }));
                    toast.success('Address detected perfectly!');
                } else {
                    // Fallback to coordinates if geocoding fails
                    setFormData(prev => ({
                        ...prev,
                        location: { lat: latitude, lng: longitude },
                        address: `Lat: ${latitude}, Lng: ${longitude}`
                    }));
                    toast('Coordinates captured, but address resolution failed.');
                }
            } catch (err) {
                console.error('Geocoding Error:', err);
                toast.error('Location capture failed');
            } finally {
                setDetecting(false);
            }
        },
        (error) => {
            console.error('Location Error:', error);
            setDetecting(false);
            toast.error('Failed to get location. Please enter manually.');
        }
    );
  };

  const benefits = useMemo(() => [
    { title: 'Bulk Orders', desc: 'Receive high-volume orders from regional laundry units.', icon: 'inventory' },
    { title: 'Logistics Ready', desc: 'Direct access to Spinzyt fleet for pick & pack.', icon: 'forklift' },
    { title: 'Guaranteed Payouts', desc: 'Secure settlements directly back to your business.', icon: 'account_balance' },
    { title: 'Digital Marketplace', desc: 'Manage catalog and stock from one dashboard.', icon: 'apps' }
  ], []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.supplierName || !formData.businessName || !formData.address || !formData.city || !formData.pincode) {
        return toast.error('Please fill all required business fields');
    }

    if (!formData.bankDetails.accountNumber || !formData.bankDetails.ifscCode) {
        return toast.error('Please provide bank details for settlements');
    }

    if (!formData.documents.gstCert || !formData.documents.aadharCard) {
        return toast.error('Please upload mandatory documents (GST & Aadhar)');
    }

    try {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const userId = user._id || user.id || localStorage.getItem('userId');
        
        if (!userId) {
          navigate('/user/auth');
          return;
        }

        // Use FormData for Multipart
        const data = new FormData();
        data.append('supplierName', formData.supplierName);
        data.append('businessName', formData.businessName);
        data.append('address', formData.address);
        data.append('city', formData.city);
        data.append('pincode', formData.pincode);
        data.append('gst', formData.gst);
        data.append('location', JSON.stringify(formData.location));
        data.append('bankDetails', JSON.stringify(formData.bankDetails));
        
        // Append Files
        if (formData.documents.gstCert) data.append('gstCert', formData.documents.gstCert);
        if (formData.documents.udyogAadhar) data.append('udyogAadhar', formData.documents.udyogAadhar);
        if (formData.documents.aadharCard) data.append('aadharCard', formData.documents.aadharCard);
        if (formData.documents.addressProof) data.append('addressProof', formData.documents.addressProof);

        const res = await authApi.becomeSupplier(userId, data);
        if (res.user?.role === 'Supplier') {
          // Update local storage but keep acting role as Customer until approval
          const updatedUser = { ...user, role: res.user.role, status: res.user.status, isProfileComplete: true };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          // DO NOT set userRole to Supplier here, keep it as customer
          localStorage.setItem('userRole', 'customer'); 
          
          toast.success('Registration successful! Waiting for Admin approval.');
          setTimeout(() => navigate('/user/home'), 2000);
        }
    } catch (err) {
        console.error('Transition Error:', err);
        toast.error('Failed to register as supplier');
    } finally {
        setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#F8FAFC] text-on-background min-h-[100dvh] flex flex-col font-body pb-32"
    >
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md p-6 border-b border-slate-100 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-on-surface">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="font-headline font-black text-lg tracking-tighter uppercase text-primary">Supplier Program</h1>
        <div className="w-10"></div>
      </header>

      <main className="pt-28 px-6 max-w-2xl mx-auto w-full space-y-10">
        <section className="text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-[2.5rem] flex items-center justify-center text-primary mx-auto mb-6">
            <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>factory</span>
          </div>
          <h2 className="text-4xl font-black tracking-tighter leading-none mb-4">Empower the<br/><span className="text-primary italic">Supply Chain.</span></h2>
          <p className="text-xs font-bold text-on-surface-variant opacity-60 leading-relaxed uppercase tracking-widest">Connect with hundreds of laundry units and scale your distribution.</p>
        </section>

        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Business Section */}
            <div className="bg-white p-8 rounded-[3rem] shadow-xl shadow-primary/5 border border-slate-100 space-y-6">
                <div className="flex items-center gap-2 px-2">
                    <span className="material-symbols-outlined text-primary text-sm">business</span>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">Business Credentials</h3>
                </div>

                <div className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest px-1">Supplier / Owner Name</label>
                        <input 
                            required
                            type="text" 
                            placeholder="Full Name"
                            value={formData.supplierName}
                            onChange={e => setFormData({...formData, supplierName: e.target.value})}
                            className="w-full bg-slate-50 border-none p-4 rounded-2xl font-bold text-sm focus:ring-4 ring-primary/10 transition-all"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest px-1">Business Name</label>
                        <input 
                            required
                            type="text" 
                            placeholder="e.g. PureChemicals Industrial"
                            value={formData.businessName}
                            onChange={e => setFormData({...formData, businessName: e.target.value})}
                            className="w-full bg-slate-50 border-none p-4 rounded-2xl font-bold text-sm focus:ring-4 ring-primary/10 transition-all"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest px-1">GST Number (Optional)</label>
                        <input 
                            type="text" 
                            placeholder="15-digit GSTIN"
                            value={formData.gst}
                            onChange={e => setFormData({...formData, gst: e.target.value})}
                            className="w-full bg-slate-50 border-none p-4 rounded-2xl font-bold text-sm focus:ring-4 ring-primary/10 transition-all uppercase"
                        />
                    </div>

                    <div className="space-y-1 relative">
                        <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest px-1 flex justify-between">
                            Full Business Address
                            <button 
                                type="button" 
                                onClick={handleGetCurrentLocation}
                                className="text-primary flex items-center gap-1 hover:underline active:scale-95 transition-all"
                            >
                                <span className={`material-symbols-outlined text-sm ${detecting ? 'animate-spin' : ''}`}>my_location</span>
                                {detecting ? 'Detecting...' : 'Use Current'}
                            </button>
                        </label>
                        <textarea 
                            required
                            rows="3"
                            placeholder="Warehouse or Office address"
                            value={formData.address}
                            onChange={e => setFormData({...formData, address: e.target.value})}
                            className="w-full bg-slate-50 border-none p-4 rounded-2xl font-bold text-sm focus:ring-4 ring-primary/10 transition-all resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest px-1">City</label>
                            <input 
                                required
                                type="text" 
                                placeholder="e.g. Mumbai"
                                value={formData.city}
                                onChange={e => setFormData({...formData, city: e.target.value})}
                                className="w-full bg-slate-50 border-none p-4 rounded-2xl font-bold text-sm focus:ring-4 ring-primary/10 transition-all"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest px-1">Pincode</label>
                            <input 
                                required
                                type="text" 
                                placeholder="6-digit ZIP"
                                value={formData.pincode}
                                onChange={e => setFormData({...formData, pincode: e.target.value})}
                                className="w-full bg-slate-50 border-none p-4 rounded-2xl font-bold text-sm focus:ring-4 ring-primary/10 transition-all"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Document Section */}
            <div className="bg-white p-8 rounded-[3rem] shadow-xl shadow-primary/5 border border-slate-100 space-y-6">
                <div className="flex items-center gap-2 px-2">
                    <span className="material-symbols-outlined text-blue-600 text-sm">document_scanner</span>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">Kyc Documentation</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { label: 'GST Certificate', key: 'gstCert' },
                        { label: 'Udyog Aadhar', key: 'udyogAadhar' },
                        { label: 'Aadhar Card', key: 'aadharCard' },
                        { label: 'Address Proof', key: 'addressProof' }
                    ].map((doc) => (
                        <div key={doc.key} className="space-y-2">
                            <label className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest px-1">{doc.label}</label>
                            <label className={`flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${formData.documents[doc.key] ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-primary/40'}`}>
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleFileChange(e, doc.key)}
                                />
                                <span className="material-symbols-outlined text-lg mb-1">{formData.documents[doc.key] ? 'check_circle' : 'upload_file'}</span>
                                <span className="text-[8px] font-black uppercase text-center">{formData.documents[doc.key] ? formData.documents[doc.key].name.slice(0, 15) + '...' : 'Tap to Upload'}</span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bank Section */}
            <div className="bg-white p-8 rounded-[3rem] shadow-xl shadow-primary/5 border border-slate-100 space-y-6">
                <div className="flex items-center gap-2 px-2">
                    <span className="material-symbols-outlined text-emerald-600 text-sm">payments</span>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">Bank Settlement Details</h3>
                </div>

                <div className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest px-1">Account Holder Name</label>
                        <input 
                            required
                            type="text" 
                            placeholder="Name as per Bank Record"
                            value={formData.bankDetails.accountHolderName}
                            onChange={e => setFormData({...formData, bankDetails: {...formData.bankDetails, accountHolderName: e.target.value}})}
                            className="w-full bg-slate-50 border-none p-4 rounded-2xl font-bold text-sm focus:ring-4 ring-primary/10 transition-all"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest px-1">Account Number</label>
                        <input 
                            required
                            type="text" 
                            placeholder="Bank Account Number"
                            value={formData.bankDetails.accountNumber}
                            onChange={e => setFormData({...formData, bankDetails: {...formData.bankDetails, accountNumber: e.target.value}})}
                            className="w-full bg-slate-50 border-none p-4 rounded-2xl font-bold text-sm focus:ring-4 ring-primary/10 transition-all"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest px-1">IFSC Code</label>
                            <input 
                                required
                                type="text" 
                                placeholder="IFSC"
                                value={formData.bankDetails.ifscCode}
                                onChange={e => setFormData({...formData, bankDetails: {...formData.bankDetails, ifscCode: e.target.value}})}
                                className="w-full bg-slate-50 border-none p-4 rounded-2xl font-bold text-sm focus:ring-4 ring-primary/10 transition-all uppercase"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest px-1">Bank Name</label>
                            <input 
                                required
                                type="text" 
                                placeholder="e.g. HDFC Bank"
                                value={formData.bankDetails.bankName}
                                onChange={e => setFormData({...formData, bankDetails: {...formData.bankDetails, bankName: e.target.value}})}
                                className="w-full bg-slate-50 border-none p-4 rounded-2xl font-bold text-sm focus:ring-4 ring-primary/10 transition-all"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <button 
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-5 rounded-3xl font-black text-[13px] uppercase tracking-widest shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-4"
            >
                {loading ? 'Processing...' : 'Register as Supplier'}
                <span className="material-symbols-outlined text-sm">rocket_launch</span>
            </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {benefits.map((benefit, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 flex items-center gap-5 border border-slate-100 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined">{benefit.icon}</span>
              </div>
              <div>
                <h3 className="font-black text-[12px] text-on-surface tracking-tight mb-0.5 uppercase">{benefit.title}</h3>
                <p className="text-[9px] font-bold text-on-surface-variant leading-tight opacity-50 uppercase tracking-widest">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-[9px] font-black uppercase tracking-[0.3em] text-on-surface-variant opacity-30">Spinzyt B2B Solutions • 2026</p>
      </main>
    </motion.div>
  );
};

export default RegisterAsSupplierPage;
