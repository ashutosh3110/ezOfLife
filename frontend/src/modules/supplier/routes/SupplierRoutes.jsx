import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import SupplierAuth from '../pages/SupplierAuth';
import SupplierOtp from '../pages/SupplierOtp';
import SupplierDashboard from '../pages/SupplierDashboard';
import SupplierRateCard from '../pages/SupplierRateCard';
import SupplierFulfillmentPage from '../pages/SupplierFulfillmentPage';
import SupplierLayout from '../layouts/SupplierLayout';
import SupplierLogistics from '../pages/SupplierLogistics';
import SupplierWallet from '../pages/SupplierWallet';
import SupplierProfile from '../pages/SupplierProfile';

const SupplierRoutes = () => {
  return (
    <Routes>
      <Route element={<SupplierLayout />}>
        {/* Auth Simulation */}
        <Route path="/auth" element={<SupplierAuth />} />
        <Route path="/otp" element={<SupplierOtp />} />

        {/* Main Hub */}
        <Route path="/dashboard" element={<SupplierDashboard />} />
        <Route path="/rates" element={<SupplierRateCard />} />
        <Route path="/fulfillment/:id" element={<SupplierFulfillmentPage />} />
        <Route path="/logistics" element={<SupplierLogistics />} />
        <Route path="/wallet" element={<SupplierWallet />} />
        <Route path="/profile" element={<SupplierProfile />} />
        
        {/* Default redirect to auth */}
        <Route path="*" element={<Navigate to="/supplier/auth" replace />} />
      </Route>
    </Routes>
  );
};

export default SupplierRoutes;
