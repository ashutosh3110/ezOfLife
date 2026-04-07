const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const authApi = {
    requestOtp: async (phone, channel, mode, role) => {
        try {
            const response = await fetch(`${BASE_URL}/auth/request-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone, channel, mode, role })
            });
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },
    verifyOtp: async (phone, otp) => {
        try {
            const response = await fetch(`${BASE_URL}/auth/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone, otp })
            });
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },
    adminLogin: async (email, password) => {
        try {
            const response = await fetch(`${BASE_URL}/auth/admin-login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            return await response.json();
        } catch (error) {
            console.error('Admin API Error:', error);
            throw error;
        }
    },
    completeVendorProfile: async (data) => {
        try {
            const isFormData = data instanceof FormData;
            const response = await fetch(`${BASE_URL}/auth/complete-vendor-profile`, {
                method: 'POST',
                headers: isFormData ? {} : { 'Content-Type': 'application/json' },
                body: isFormData ? data : JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error('Vendor API Error:', error);
            throw error;
        }
    },
    getStatus: async (phone) => {
        try {
            const response = await fetch(`${BASE_URL}/auth/get-status?phone=${phone}`);
            return await response.json();
        } catch (error) {
            console.error('Status API Error:', error);
            throw error;
        }
    },
    getProfile: async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/auth/profile/${id}`);
            return await response.json();
        } catch (error) {
            console.error('Get Profile Error:', error);
            throw error;
        }
    },
    updateProfile: async (id, data) => {
        try {
            const response = await fetch(`${BASE_URL}/auth/profile/update/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Update failed');
            }
            return await response.json();
        } catch (error) {
            console.error('Update Profile Error:', error);
            throw error;
        }
    }
};

export const adminApi = {
    getStats: async () => {
        try {
            const response = await fetch(`${BASE_URL}/admin/stats`);
            return await response.json();
        } catch (error) {
            console.error('Admin Stats Error:', error);
            throw error;
        }
    },
    getPendingApprovals: async () => {
        try {
            const response = await fetch(`${BASE_URL}/admin/pending-approvals`);
            return await response.json();
        } catch (error) {
            console.error('Admin Approvals Error:', error);
            throw error;
        }
    },
    getCustomers: async () => {
        try {
            const response = await fetch(`${BASE_URL}/admin/customers`);
            return await response.json();
        } catch (error) {
            console.error('Admin Customers Error:', error);
            throw error;
        }
    },
    approveVendor: async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/admin/approve-vendor/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            return await response.json();
        } catch (error) {
            console.error('Approve Vendor Error:', error);
            throw error;
        }
    },
    rejectVendor: async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/admin/reject-vendor/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            return await response.json();
        } catch (error) {
            console.error('Reject Vendor Error:', error);
            throw error;
        }
    },
    getAllVendors: async () => {
        try {
            const response = await fetch(`${BASE_URL}/admin/vendors`);
            return await response.json();
        } catch (error) {
            console.error('All Vendors Error:', error);
            throw error;
        }
    }
};

export const orderApi = {
    createOrder: async (orderData) => {
        try {
            const response = await fetch(`${BASE_URL}/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });
            return await response.json();
        } catch (error) {
            console.error('Create Order Error:', error);
            throw error;
        }
    },
    getMyOrders: async (customerId) => {
        try {
            const response = await fetch(`${BASE_URL}/orders/my?customerId=${customerId}`);
            return await response.json();
        } catch (error) {
            console.error('Get Orders Error:', error);
            throw error;
        }
    },
    getVendorOrders: async (vendorId) => {
        try {
            const response = await fetch(`${BASE_URL}/orders/vendor?vendorId=${vendorId}`);
            return await response.json();
        } catch (error) {
            console.error('Get Vendor Orders Error:', error);
            throw error;
        }
    },
    updateOrderStatus: async (id, status) => {
        try {
            const response = await fetch(`${BASE_URL}/orders/status/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            return await response.json();
        } catch (error) {
            console.error('Update Status Error:', error);
            throw error;
        }
    },
    getRiderTasks: async (riderId) => {
        try {
            const response = await fetch(`${BASE_URL}/orders/rider/${riderId}`);
            return await response.json();
        } catch (error) {
            console.error('Get Rider Tasks Error:', error);
            throw error;
        }
    },
    acceptTask: async (orderId, riderId) => {
        try {
            const response = await fetch(`${BASE_URL}/orders/accept/${orderId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ riderId })
            });
            return await response.json();
        } catch (error) {
            console.error('Accept Task Error:', error);
            throw error;
        }
    },
    getRiderStats: async (riderId) => {
        try {
            const response = await fetch(`${BASE_URL}/orders/rider-stats/${riderId}`);
            return await response.json();
        } catch (error) {
            console.error('Get Rider Stats Error:', error);
            throw error;
        }
    }
};

export const notificationApi = {
    getNotifications: async (userId, role) => {
        try {
            const response = await fetch(`${BASE_URL}/notifications?userId=${userId}&role=${role}`);
            return await response.json();
        } catch (error) {
            console.error('Get Notifications Error:', error);
            throw error;
        }
    },
    markAsRead: async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/notifications/${id}/read`, { method: 'PATCH' });
            return await response.json();
        } catch (error) {
            console.error('Mark Read Error:', error);
            throw error;
        }
    },
    clearAll: async (userId, role) => {
        try {
            const response = await fetch(`${BASE_URL}/notifications/clear?userId=${userId}&role=${role}`, { method: 'DELETE' });
            return await response.json();
        } catch (error) {
            console.error('Clear Notifications Error:', error);
            throw error;
        }
    }
};

export const serviceApi = {
    getAll: async () => {
        try {
            const response = await fetch(`${BASE_URL}/services`);
            return await response.json();
        } catch (error) {
            console.error('Service API Error:', error);
            throw error;
        }
    },
    create: async (data) => {
        try {
            const response = await fetch(`${BASE_URL}/services`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error('Create Service Error:', error);
            throw error;
        }
    },
    update: async (id, data) => {
        try {
            const response = await fetch(`${BASE_URL}/services/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error('Update Service Error:', error);
            throw error;
        }
    },
    delete: async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/services/${id}`, {
                method: 'DELETE'
            });
            return await response.json();
        } catch (error) {
            console.error('Delete Service Error:', error);
            throw error;
        }
    }
};

