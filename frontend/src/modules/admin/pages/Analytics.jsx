import React from 'react';
import { BarChart3, TrendingUp, ShoppingBag, Users, Zap, Calendar, Download, Filter, Target, Activity, Cpu, Monitor, IndianRupee, Star, ShieldCheck } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { mockAdminData } from '../data/mockData';
import PageHeader from '../components/common/PageHeader';
import MetricRow from '../components/cards/MetricRow';
import ChartPanel from '../components/cards/ChartPanel';

export default function Analytics() {
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="flex flex-col min-h-screen bg-slate-25/50 pb-20">
      <PageHeader 
        title="Analytics" 
        actions={[
          { label: 'Export Data Report', icon: Download, variant: 'secondary' },
          { label: 'Set Goals', icon: Target, variant: 'primary' }
        ]}
      />

      {/* Analytics Performance Layer */}
      <div className="bg-white border-b border-slate-200 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 divide-x divide-slate-100 max-w-[1600px] mx-auto w-full">
            <MetricRow label="Monthly Growth" value="12.42%" change="+1.2%" trend="up" icon={TrendingUp} />
            <MetricRow label="User Satisfaction" value="4.8/5" change="+0.2" trend="up" icon={Star} />
            <MetricRow label="Daily Growth" value="₹12.4K" change="-1.2K" trend="up" icon={IndianRupee} />
            <MetricRow label="Overall Compliance" value="100%" trend="up" icon={ShieldCheck} />
        </div>
      </div>

      <div className="p-6 space-y-6 max-w-[1600px] mx-auto w-full">
        {/* Performance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartPanel 
            title="Revenue Overview" 
            subtitle="Platform revenue trend analysis"
          >
            <div className="h-full w-full p-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockAdminData.revenueFlow} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAnalytics" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 9, fontWeight: 900 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 9, fontWeight: 900 }} />
                  <Tooltip contentStyle={{ borderRadius: '1px', border: '1px solid #f1f5f9', fontWeight: 'black', textTransform: 'uppercase' }} />
                  <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorAnalytics)" strokeWidth={4} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartPanel>

          <ChartPanel 
            title="Orders by Category" 
            subtitle="Operational yield segmentation"
          >
            <div className="h-full w-full p-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockAdminData.orderStats} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 9, fontWeight: 900 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 9, fontWeight: 900 }} />
                  <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '1px', border: '1px solid #f1f5f9' }} />
                  <Bar dataKey="orders" fill="#3b82f6" radius={[1, 1, 0, 0]} barSize={24}>
                    {mockAdminData.orderStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} opacity={0.8} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartPanel>
        </div>

        {/* Platform Performance Layer (Phase 3 Requirement) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-6 border border-slate-200 rounded-sm flex flex-col gap-8 shadow-sm">
               <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                  <div className="flex items-center gap-2">
                     <Activity size={14} className="text-slate-900" />
                     <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] leading-none">Operational Global Pulse</h3>
                  </div>
                  <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/5 px-2 py-0.5 border border-emerald-500/10">MISSION CRITICAL</span>
               </div>
               
               <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="flex flex-col gap-1">
                     <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest opacity-60">Fulfillment KPI</span>
                     <div className="flex items-end gap-2">
                        <span className="text-2xl font-black text-slate-900 tabular-nums leading-none tracking-tighter italic">99.8%</span>
                        <span className="text-[9px] text-emerald-500 font-bold mb-0.5">↗ +0.02</span>
                     </div>
                  </div>
                  <div className="flex flex-col gap-1 text-primary">
                     <span className="text-[8px] font-black text-primary uppercase tracking-widest opacity-40">Network Latency</span>
                     <div className="flex items-end gap-2">
                        <span className="text-2xl font-black text-slate-900 tabular-nums leading-none tracking-tighter italic">42ms</span>
                        <span className="text-[9px] text-slate-300 font-bold mb-0.5 uppercase">STABLE</span>
                     </div>
                  </div>
                  <div className="flex flex-col gap-1 text-rose-500">
                     <span className="text-[8px] font-black text-rose-500 uppercase tracking-widest opacity-40">System Faults</span>
                     <div className="flex items-end gap-2">
                        <span className="text-2xl font-black text-slate-900 tabular-nums leading-none tracking-tighter italic">00</span>
                        <span className="text-[9px] text-emerald-500 font-bold mb-0.5 uppercase tracking-tighter">OPTIMAL</span>
                     </div>
                  </div>
                  <div className="flex flex-col gap-1">
                     <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest opacity-60">Avg Order Value</span>
                     <div className="flex items-end gap-2">
                        <span className="text-2xl font-black text-slate-900 tabular-nums leading-none tracking-tighter italic">₹482</span>
                        <span className="text-[9px] text-blue-500 font-bold mb-0.5 italic">↗ +12%</span>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-slate-50">
                  <div className="flex flex-col gap-1">
                     <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest opacity-60">Active Riders</span>
                     <span className="text-xl font-black text-slate-900 tabular-nums leading-none tracking-tighter italic">142</span>
                  </div>
                  <div className="flex flex-col gap-1">
                     <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest opacity-60">Active Vendors</span>
                     <span className="text-xl font-black text-slate-900 tabular-nums leading-none tracking-tighter italic">32</span>
                  </div>
                  <div className="flex flex-col gap-1">
                     <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest opacity-60">Tasks / Rider</span>
                     <span className="text-xl font-black text-slate-900 tabular-nums leading-none tracking-tighter italic">14.2</span>
                  </div>
                  <div className="flex flex-col gap-1">
                     <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest opacity-60">Handshake KPI</span>
                     <span className="text-xl font-black text-emerald-500 tabular-nums leading-none tracking-tighter italic">98%</span>
                  </div>
               </div>
            </div>

            <ChartPanel title="Market Segmentation" subtitle="Category yield breakdown" height={325}>
               <div className="h-full w-full p-2">
                 <ResponsiveContainer width="100%" height="100%">
                   <PieChart>
                     <Pie
                       data={[
                         { name: 'Laundry', value: 400 },
                         { name: 'Dry Clean', value: 300 },
                         { name: 'Ironing', value: 300 },
                         { name: 'Premium', value: 200 },
                       ]}
                       innerRadius={60}
                       outerRadius={80}
                       paddingAngle={5}
                       dataKey="value"
                     >
                       {[1, 2, 3, 4].map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                       ))}
                     </Pie>
                     <Tooltip />
                   </PieChart>
                 </ResponsiveContainer>
                 <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-[-20px] pb-4">
                    {['Laundry', 'Dry Clean', 'Ironing', 'Premium'].map((cat, i) => (
                        <div key={cat} className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                            <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">{cat}</span>
                        </div>
                    ))}
                 </div>
               </div>
            </ChartPanel>
        </div>

      </div>
    </div>
  );
}
