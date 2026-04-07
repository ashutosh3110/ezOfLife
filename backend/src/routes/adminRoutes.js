import express from 'express';
import { 
    getPendingApprovals, 
    approveVendor, 
    rejectVendor, 
    getDashboardStats,
    getAllVendors,
    getCustomers
} from '../controllers/adminController.js';

const router = express.Router();

// Dashboard Stats
router.get('/stats', getDashboardStats);

// User/Vendor Management
router.get('/vendors', getAllVendors);
router.get('/customers', getCustomers);
router.get('/pending-approvals', getPendingApprovals);
router.post('/approve-vendor/:id', approveVendor);
router.post('/reject-vendor/:id', rejectVendor);

export default router;
