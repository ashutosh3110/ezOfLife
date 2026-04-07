import express from 'express';
import { 
    createOrder, 
    getMyOrders, 
    getVendorOrders, 
    updateOrderStatus, 
    getAllOrders,
    getRiderTasks,
    acceptOrder,
    getRiderStats
} from '../controllers/orderController.js';

const router = express.Router();

// Create new order
router.post('/', createOrder);

// Get my orders (Customer)
router.get('/my', getMyOrders);

// Get vendor assigned orders
router.get('/vendor', getVendorOrders);

// Update order status
router.patch('/status/:id', updateOrderStatus);

// Rider Specific Routes
router.post('/accept/:id', acceptOrder);
router.get('/rider/:riderId', getRiderTasks);
router.get('/rider-stats/:riderId', getRiderStats);

// Admin: Get all orders
router.get('/all', getAllOrders);

export default router;
