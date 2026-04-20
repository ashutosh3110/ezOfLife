import B2BOrder from '../models/B2BOrder.js';
import User from '../models/User.js';

// Place B2B Order with Pincode Matching
export const placeB2BOrder = async (req, res) => {
    try {
        const { vendorId, items, shippingAddress, totalAmount, pincode } = req.body;

        // 1. Find a Supplier in the same Pincode
        const matchedSupplier = await User.findOne({
            role: 'Supplier',
            status: 'approved',
            'supplierDetails.pincode': pincode
        });

        if (!matchedSupplier) {
            return res.status(404).json({ 
                message: 'No approved supplier found in your pincode area. Platform logistics currently unavailable for this region.' 
            });
        }

        // 2. Create Order assigned to this Supplier
        const order = new B2BOrder({
            vendor: vendorId,
            supplier: matchedSupplier._id,
            items,
            shippingAddress,
            totalAmount,
            pincode,
            status: 'Pending',
            paymentStatus: 'Pending', // Assuming payment happens after or during placement
            escrowStatus: 'Held'
        });

        await order.save();

        res.status(201).json({ 
            message: 'Order routed to regional supplier!', 
            order,
            supplier: {
                businessName: matchedSupplier.supplierDetails.businessName,
                phone: matchedSupplier.phone
            }
        });
    } catch (err) {
        console.error('B2B Order Placement Error:', err);
        res.status(500).json({ message: 'Internal server error while routing order' });
    }
};

// Get orders for a specific Supplier
export const getSupplierOrders = async (req, res) => {
    try {
        const { supplierId } = req.params;
        const orders = await B2BOrder.find({ supplier: supplierId })
            .populate('vendor', 'displayName phone shopDetails')
            .sort({ createdAt: -1 });

        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching supplier orders' });
    }
};

// Get orders for a specific Vendor
export const getVendorOrders = async (req, res) => {
    const { vendorId } = req.params;
    console.log(`📡 [B2B_FETCH] Fetching orders for Vendor ID: ${vendorId}`);
    try {
        const orders = await B2BOrder.find({ vendor: vendorId })
            .populate('supplier', 'displayName phone supplierDetails')
            .sort({ createdAt: -1 });

        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching vendor orders' });
    }
};

// Update B2B Order Status (Supplier Side)
export const updateB2BStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // 'Accepted', 'Dispatched', 'Delivered'

        const order = await B2BOrder.findByIdAndUpdate(id, { status }, { new: true });
        
        if (!order) return res.status(404).json({ message: 'Order not found' });

        res.status(200).json({ message: `Order status updated to ${status}`, order });
    } catch (err) {
        res.status(500).json({ message: 'Error updating status' });
    }
};
