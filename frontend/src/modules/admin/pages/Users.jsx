import React, { useEffect, useState, useMemo } from 'react';
import { Users as UsersIcon, UserPlus, Mail, ShoppingBag, IndianRupee, MoreHorizontal, ShieldAlert, UserCheck, Activity, Star, Zap, Target, Phone, X, Save } from 'lucide-react';
import { adminApi } from '../../../lib/api';
import PageHeader from '../components/common/PageHeader';
import DataGrid from '../components/tables/DataGrid';
import StatusBadge from '../components/common/StatusBadge';
import MetricRow from '../components/cards/MetricRow';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    phone: '',
    email: '',
    address: ''
  });
  const [message, setMessage] = useState(null);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getCustomers();
      setUsers(res);
    } catch (err) {
      console.error('Fetch customers error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    try {
      const res = await adminApi.registerCustomer(formData);
      if (res.user) {
        setMessage({ type: 'success', text: 'Customer registered successfully!' });
        setFormData({ displayName: '', phone: '', email: '', address: '' });
        fetchCustomers();
        setTimeout(() => setShowModal(false), 1500);
      } else {
        setMessage({ type: 'error', text: res.message || 'Registration failed' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Server error occurred' });
    } finally {
      setSubmitting(false);
    }
  };

  const userStats = useMemo(() => [
    { label: 'Total Registered Users', value: users.length, change: '+0', trend: 'up', icon: UsersIcon },
    { label: 'Retention Rate', value: '84.2%', change: '+2.4%', trend: 'up', icon: Target },
    { label: 'Daily Active Users', value: '124', change: '+18', trend: 'up', icon: Activity },
    { label: 'Conversion Rate', value: '4.8%', change: '+0.2%', trend: 'up', icon: Zap }
  ], [users]);

  const userColumns = useMemo(() => [
    { 
      header: 'Customer', 
      key: 'displayName',
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center text-slate-400">
             <img src={`https://ui-avatars.com/api/?name=${val || row.phone}&background=f1f5f9&color=64748b`} alt={val} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 text-[11px] uppercase tracking-tight leading-none mb-1">
              {val || '-'}
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] opacity-60 flex items-center gap-1.5 tabular-nums leading-none">
                <Mail size={10} className="text-slate-300" /> {row.email || '-'}
              </span>
              <span className="text-[9px] text-primary font-bold uppercase tracking-[0.2em] flex items-center gap-1.5 tabular-nums leading-none">
                <Phone size={10} className="text-primary/40" /> {row.phone}
              </span>
            </div>
          </div>
        </div>
      )
    },
    { 
      header: 'Order Stats', 
      key: 'orders',
      render: (val) => (
        <div className="flex flex-col gap-1.5">
           <div className="flex items-center gap-1.5">
              <ShoppingBag size={10} className="text-slate-400" />
              <span className="font-bold text-slate-900 tabular-nums text-xs">{val || 0} <span className="text-[10px] opacity-20 ml-1 uppercase leading-none tracking-widest">ORDERS COMPLETED</span></span>
           </div>
           <div className="w-20 h-1 bg-slate-50 border border-slate-100 rounded-sm relative overflow-hidden">
              <div className="h-full bg-slate-900" style={{ width: `${Math.min((val || 0) * 5, 100)}%` }} />
           </div>
        </div>
      )
    },
    { 
      header: 'Total Spent', 
      key: 'spent', 
      align: 'right', 
      render: (val) => <span className="font-bold text-slate-900 tabular-nums text-xs uppercase tracking-widest">{val || '₹0'}</span> 
    },
    { 
      header: 'Status', 
      key: 'status', 
      render: (val) => <StatusBadge status={val === 'approved' ? 'Active' : val || 'Active'} /> 
    },
    { 
      header: 'Actions', 
      key: 'actions', 
      align: 'right',
      render: (_, row) => (
        <div className="flex items-center justify-end gap-2.5">
          <button className={`p-2 rounded-sm border transition-all ${row.status === 'approved' || !row.status ? 'bg-rose-50 border-rose-100 text-rose-500 hover:bg-rose-600 hover:text-white hover:border-rose-600' : 'bg-emerald-50 border-emerald-100 text-emerald-500 hover:bg-emerald-600 hover:text-white hover:border-emerald-600'}`}>
            {row.status === 'approved' || !row.status ? <ShieldAlert size={13} /> : <UserCheck size={13} />}
          </button>
        </div>
      )
    }
  ], []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50 pb-20">
      <PageHeader 
        title="Users" 
        actions={[
          { label: 'Register New User', icon: UserPlus, variant: 'primary', onClick: () => setShowModal(true) }
        ]}
      />

      {/* Engagement Intelligence Layer */}
      <div className="bg-white border-b border-slate-200 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 divide-x divide-slate-100 max-w-[1600px] mx-auto w-full">
            {userStats.map((stat, i) => (
                <MetricRow key={i} {...stat} />
            ))}
        </div>
      </div>

      <div className="p-6 space-y-6 max-w-[1600px] mx-auto w-full">
        {/* User Index */}
        <DataGrid 
          title="Master User Index"
          columns={userColumns}
          data={users}
          onAction={(row) => console.log('Viewing user detail', row.id)}
          loading={loading}
        />
      </div>

      {/* Registration Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="bg-white border-4 border-slate-900 w-full max-w-lg relative z-10 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] overflow-hidden">
            <div className="bg-slate-900 p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <UserPlus size={20} className="text-primary" />
                <h2 className="font-black uppercase tracking-tighter text-lg italic">Register New Customer</h2>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="hover:rotate-90 transition-transform duration-300"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleRegister} className="p-6 space-y-4">
              {message && (
                <div className={`p-3 border-2 font-bold uppercase tracking-widest text-[10px] ${message.type === 'success' ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-rose-50 border-rose-500 text-rose-700'}`}>
                   {message.text}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Full Name</label>
                <input 
                  required
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border-2 border-slate-200 p-3 text-xs font-bold focus:border-slate-900 focus:bg-white outline-none transition-all uppercase"
                  placeholder="Rahul Sharma"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Phone Number</label>
                  <input 
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border-2 border-slate-200 p-3 text-xs font-bold focus:border-slate-900 focus:bg-white outline-none transition-all tabular-nums"
                    placeholder="70000XXXXX"
                    maxLength={10}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Email (Optional)</label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border-2 border-slate-200 p-3 text-xs font-bold focus:border-slate-900 focus:bg-white outline-none transition-all"
                    placeholder="rahul@example.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Address (Optional)</label>
                <textarea 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full bg-slate-50 border-2 border-slate-200 p-3 text-xs font-bold focus:border-slate-900 focus:bg-white outline-none transition-all uppercase resize-none"
                  placeholder="Sector 56, Gurgaon..."
                />
              </div>

              <button 
                disabled={submitting}
                type="submit" 
                className="w-full bg-primary hover:bg-slate-900 text-white font-black uppercase py-4 tracking-[0.2em] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {submitting ? 'Registering...' : (
                  <>
                    <Save size={18} className="group-hover:scale-125 transition-transform" /> 
                    Save Customer
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
