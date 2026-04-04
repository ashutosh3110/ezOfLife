import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RiderLayout from '../layouts/RiderLayout';
import RiderDashboard from '../pages/RiderDashboard';
import RiderWallet from '../pages/RiderWallet';
import TaskDetails from '../pages/TaskDetails';

// Placeholder Pages
const RiderProfile = () => <div className="p-10 font-black uppercase tracking-widest text-on-surface">Rider Profile</div>;

const RiderRoutes = () => {
  return (
    <Routes>
      <Route element={<RiderLayout />}>
        <Route path="/dashboard" element={<RiderDashboard />} />
        <Route path="/task/:id" element={<TaskDetails />} />
        <Route path="/wallet" element={<RiderWallet />} />
        <Route path="/profile" element={<RiderProfile />} />
        <Route path="/" element={<Navigate to="/rider/dashboard" replace />} />
      </Route>
      {/* Catch-all to redirect back to dashboard */}
      <Route path="*" element={<Navigate to="/rider/dashboard" replace />} />
    </Routes>
  );
};

export default RiderRoutes;
