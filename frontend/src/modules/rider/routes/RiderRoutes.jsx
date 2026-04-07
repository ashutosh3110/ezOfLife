import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RiderLayout from '../layouts/RiderLayout';
import RiderDashboard from '../pages/RiderDashboard';
import RiderWallet from '../pages/RiderWallet';
import TaskDetails from '../pages/TaskDetails';

import RiderAuth from '../pages/RiderAuth';
import RiderOtp from '../pages/RiderOtp';
import RiderProfile from '../pages/RiderProfile';

const RiderRoutes = () => {
  return (
    <Routes>
      <Route element={<RiderLayout />}>
        {/* Auth Flow */}
        <Route path="/auth" element={<RiderAuth />} />
        <Route path="/otp" element={<RiderOtp />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<RiderDashboard />} />
        <Route path="/task/:id" element={<TaskDetails />} />
        <Route path="/wallet" element={<RiderWallet />} />
        <Route path="/profile" element={<RiderProfile />} />
        <Route path="/" element={<Navigate to="/rider/auth" replace />} />
      </Route>
      {/* Catch-all to redirect back to auth */}
      <Route path="*" element={<Navigate to="/rider/auth" replace />} />
    </Routes>
  );
};

export default RiderRoutes;
