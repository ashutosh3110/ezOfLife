import User from '../models/User.js';

// Get all vendors pending approval
export const getPendingApprovals = async (req, res) => {
    try {
        const pendingVendors = await User.find({ 
            role: 'Vendor', 
            status: 'pending'
        }).select('-otp -otpExpiry');
        
        res.status(200).json(pendingVendors);
    } catch (err) {
        console.error('Get Pending Approvals Error:', err);
        res.status(500).json({ message: 'Error fetching approvals' });
    }
};

// Approve a vendor
export const approveVendor = async (req, res) => {
    try {
        const { id } = req.params;
        const vendor = await User.findByIdAndUpdate(
            id, 
            { status: 'approved' }, 
            { new: true }
        );

        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }

        res.status(200).json({ message: 'Vendor approved successfully', vendor });
    } catch (err) {
        console.error('Approve Vendor Error:', err);
        res.status(500).json({ message: 'Error approving vendor' });
    }
};

// Reject a vendor
export const rejectVendor = async (req, res) => {
    try {
        const { id } = req.params;
        const vendor = await User.findByIdAndUpdate(
            id, 
            { status: 'rejected' }, 
            { new: true }
        );

        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }

        res.status(200).json({ message: 'Vendor rejected', vendor });
    } catch (err) {
        console.error('Reject Vendor Error:', err);
        res.status(500).json({ message: 'Error rejecting vendor' });
    }
};

// Get Dashboard Stats (Live Data)
export const getDashboardStats = async (req, res) => {
    try {
        const [
            totalUsers,
            activeVendors,
            pendingApprovals,
            totalRiders
        ] = await Promise.all([
            User.countDocuments({ role: 'Customer' }),
            User.countDocuments({ role: 'Vendor', status: 'approved' }),
            User.countDocuments({ role: 'Vendor', status: 'pending' }),
            User.countDocuments({ role: 'Rider' })
        ]);

        // Mock revenue and orders for now as models don't exist yet
        res.status(200).json({
            stats: {
                totalUsers,
                activeVendors,
                pendingApprovals,
                totalRiders,
                totalRevenue: 142840, // Snapshot mock until Order model is live
                activeOrders: 142     // Snapshot mock until Order model is live
            }
        });
    } catch (err) {
        console.error('Get Stats Error:', err);
        res.status(500).json({ message: 'Error fetching statistics' });
    }
};

// Get all vendors (approved or pending)
export const getAllVendors = async (req, res) => {
    try {
        const vendors = await User.find({ role: 'Vendor' }).select('-otp -otpExpiry');
        res.status(200).json(vendors);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching vendors' });
    }
};

// Get all customers
export const getCustomers = async (req, res) => {
    try {
        const customers = await User.find({ role: 'Customer' }).select('-otp -otpExpiry');
        res.status(200).json(customers);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching customers' });
    }
};
