import mongoose from 'mongoose';
import Order from '../models/Order.js';
import User from '../models/User.js';
import axios from 'axios';
import Notification from '../models/Notification.js';
import fs from 'fs';

const logToFile = (msg) => {
    fs.appendFileSync('c:\\Users\\Hp\\Desktop\\ezoflife\\backend\\REAL_USER_DEBUG.log', `${new Date().toISOString()} - ${msg}\n`);
};

// Haversine formula to calculate distance between two points in km
const calculateHaversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

// Google Maps Distance Matrix API call
const calculateGoogleDistance = async (lat1, lon1, lat2, lon2) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) return null;

    try {
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${lat1},${lon1}&destinations=${lat2},${lon2}&key=${apiKey}`;
        const response = await axios.get(url);
        if (response.data.status === 'OK' && response.data.rows[0].elements[0].status === 'OK') {
            return response.data.rows[0].elements[0].distance.value / 1000; // in km
        }
        return null;
    } catch (error) {
        console.error('Google Maps API Error:', error);
        return null;
    }
};

const assignVendor = async (customerLat, customerLng) => {
    try {
        const vendors = await User.find({ role: 'Vendor', status: 'approved' });
        if (vendors.length === 0) return null;

        let closestVendor = null;
        let minDistance = Infinity;

        for (const vendor of vendors) {
            const vendorLat = vendor.location?.lat || 0;
            const vendorLng = vendor.location?.lng || 0;

            let distance = await calculateGoogleDistance(customerLat, customerLng, vendorLat, vendorLng);
            if (distance === null) {
                distance = calculateHaversineDistance(customerLat, customerLng, vendorLat, vendorLng);
            }

            if (distance < minDistance) {
                minDistance = distance;
                closestVendor = vendor;
            }
        }

        return closestVendor ? closestVendor._id : null;
    } catch (err) {
        console.error('Vendor Assignment Error:', err);
        return null;
    }
};

export const getNearbyRiders = async (customerLat, customerLng, radiusKm = 4) => {
    try {
        const cLat = Number(customerLat);
        const cLng = Number(customerLng);
        
        const riders = await User.find({ role: 'Rider', status: 'approved' });
        const nearbyRiders = [];

        logToFile(`--- Matching for ${cLat}, ${cLng} (Found ${riders.length} active riders) ---`);

        for (const rider of riders) {
            const rLat = Number(rider.location?.lat || 0);
            const rLng = Number(rider.location?.lng || 0);

            let distance = calculateHaversineDistance(cLat, cLng, rLat, rLng);
            logToFile(`Rider: ${rider.displayName}, Pos: ${rLat},${rLng}, Dist: ${distance.toFixed(3)}km`);
            
            if (distance <= radiusKm) {
                nearbyRiders.push({
                    id: rider._id,
                    distance: distance.toFixed(2),
                    name: rider.displayName
                });
            }
        }
        return nearbyRiders;
    } catch (err) {
        console.error('Nearby Riders Error:', err);
        return [];
    }
};

export const createOrder = async (req, res) => {
    try {
        const { items, pickupSlot, deliverySlot, address, location, totalAmount } = req.body;
        // In a real app, customer ID would come from auth middleware (req.user.id)
        // For testing, we'll assume it's passed or find a dummy
        const customerId = req.body.customerId; 

        if (!customerId) return res.status(400).json({ message: 'Customer ID required' });

        const vendorId = await assignVendor(location.lat, location.lng);
        const nearbyRiders = await getNearbyRiders(location.lat, location.lng, 4); 
        
        logToFile(`New Order: ${address}, Lat: ${location.lat}, Lng: ${location.lng}`);
        logToFile(`Nearby Found: ${nearbyRiders.length}`);

        const newOrder = new Order({
            customer: customerId,
            vendor: vendorId,
            items,
            pickupSlot,
            deliverySlot,
            address,
            location,
            totalAmount,
            vendor: vendorId,
            status: vendorId ? 'Assigned' : 'Pending',
            nearbyRiders: nearbyRiders.map(r => ({
                id: r.id,
                distance: r.distance,
                name: r.name
            }))
        });

        await newOrder.save();

        // Create Persistent Notifications
        const notifications = [];
        
        // 1. For Vendor
        if (vendorId) {
            notifications.push({
                recipient: vendorId,
                role: 'vendor',
                title: 'New Assignment',
                message: `Order #${newOrder._id.toString().slice(-6)} assigned to your shop.`,
                type: 'assigned',
                orderId: newOrder._id
            });
        }

        // 2. For Nearby Riders
        nearbyRiders.forEach(rider => {
            notifications.push({
                recipient: rider.id,
                role: 'rider',
                title: 'New Nearby Order',
                message: 'Pickup available within 4km. Claim now!',
                type: 'order_placed',
                orderId: newOrder._id
            });
        });

        if (notifications.length > 0) {
            try {
                await Notification.insertMany(notifications);
            } catch (notifErr) {
                console.error('Notification Insert Error:', notifErr.message);
            }
        }

        res.status(201).json({ 
            ...newOrder._doc, 
            nearbyRiders 
        });
    } catch (err) {
        res.status(500).json({ message: 'Error creating order', error: err.message });
    }
};

export const getMyOrders = async (req, res) => {
    try {
        const { customerId } = req.query; // Assume passed for now
        const orders = await Order.find({ customer: customerId }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching orders' });
    }
};

export const getVendorOrders = async (req, res) => {
    try {
        const { vendorId } = req.query;
        const orders = await Order.find({ vendor: vendorId }).populate('customer', 'displayName phone').sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching vendor orders' });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ message: 'Error updating order status' });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('customer', 'displayName phone').populate('vendor', 'shopDetails phone').sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching all orders' });
    }
};

// Rider Specific Controllers
export const getRiderTasks = async (req, res) => {
    try {
        const { riderId } = req.params;
        const rid = new mongoose.Types.ObjectId(riderId);

        const orders = await Order.find({ 
            $or: [
                { rider: rid },
                { 
                    status: { $in: ['Pending', 'Assigned'] }, 
                    'nearbyRiders.id': rid 
                }
            ]
        }).populate('customer', 'displayName phone address location').sort({ createdAt: -1 });

        console.log(`getRiderTasks for ${riderId}: found ${orders.length} orders`);
        res.status(200).json(orders);
    } catch (err) {
        console.error('Fetch Tasks Error:', err);
        res.status(500).json({ message: 'Error fetching rider tasks' });
    }
};

export const acceptOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { riderId } = req.body;
        
        // Ensure order isn't already taken
        const order = await Order.findById(id);
        if (order.rider) return res.status(400).json({ message: 'Order already accepted by another rider' });

        const updatedOrder = await Order.findByIdAndUpdate(
            id, 
            { rider: riderId, status: 'Picked Up' }, 
            { new: true }
        ).populate('customer', 'displayName phone address location');

        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json({ message: 'Error accepting order' });
    }
};

export const getRiderStats = async (req, res) => {
    try {
        const { riderId } = req.params;
        const orders = await Order.find({ rider: riderId });
        
        const completed = orders.filter(o => o.status === 'Delivered').length;
        const totalEarnings = orders.reduce((sum, o) => sum + (o.totalAmount * 0.05), 0); // 5% commission

        res.status(200).json({
            earnings: `₹${totalEarnings.toFixed(2)}`,
            completed: completed.toString(),
            rating: '4.9' // Placeholder until review system is in place
        });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching rider stats' });
    }
};
