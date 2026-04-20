import express from 'express';
const router = express.Router();
import * as b2bController from '../controllers/b2bOrderController.js';

router.post('/place', b2bController.placeB2BOrder);
router.get('/supplier/:supplierId', b2bController.getSupplierOrders);
router.get('/vendor/:vendorId', b2bController.getVendorOrders);
router.patch('/:id/status', b2bController.updateB2BStatus);

export default router;
