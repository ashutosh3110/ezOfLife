import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import SplashPage from '../pages/SplashPage';
import AuthPage from '../pages/AuthPage';
import OtpVerificationPage from '../pages/OtpVerificationPage';
import HomePage from '../pages/HomePage';
import CartPage from '../pages/CartPage';
import SuccessPage from '../pages/SuccessPage';
import OrderConfirmationPage from '../pages/OrderConfirmationPage';
import OrderTrackingPage from '../pages/OrderTrackingPage';
import DeliveryVerificationPage from '../pages/DeliveryVerificationPage';
import PaymentSelectionPage from '../pages/PaymentPage';
import SuccessFeedbackPage from '../pages/SuccessFeedbackPage';
import OrdersHistoryPage from '../pages/OrdersHistoryPage';
import UserProfilePage from '../pages/UserProfilePage';
import MoreMenuPage from '../pages/MoreMenuPage';
import EditProfilePage from '../pages/EditProfilePage';
import AddressesPage from '../pages/AddressesPage';
import NotificationsPage from '../pages/NotificationsPage';
import AllServicesPage from '../pages/AllServicesPage';
import ServiceInfoPage from '../pages/ServiceInfoPage';

import UserLayout from '../layouts/UserLayout';

const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/" element={<SplashPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/otp" element={<OtpVerificationPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/confirmation" element={<OrderConfirmationPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/tracking" element={<OrderTrackingPage />} />
        <Route path="/verification" element={<DeliveryVerificationPage />} />
        <Route path="/payment" element={<PaymentSelectionPage />} />
        <Route path="/success-feedback" element={<SuccessFeedbackPage />} />
        <Route path="/orders" element={<OrdersHistoryPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/profile/edit" element={<EditProfilePage />} />
        <Route path="/profile/addresses" element={<AddressesPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/services" element={<AllServicesPage />} />
        <Route path="/service-info" element={<ServiceInfoPage />} />
        <Route path="/more" element={<MoreMenuPage />} />
      </Route>
      {/* Fallback to splash */}
      <Route path="*" element={<Navigate to="/user/" replace />} />
    </Routes>
  );
};

export default UserRoutes;
