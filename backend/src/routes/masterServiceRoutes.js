import express from 'express';
const router = express.Router();
import { 
    createMasterService, 
    getAllMasterServices, 
    updateMasterService, 
    deleteMasterService,
    getVendorPricingReport
} from '../controllers/masterServiceController.js';

router.post('/', createMasterService);
router.get('/', getAllMasterServices);
router.get('/:serviceId/vendors', getVendorPricingReport);
router.put('/:id', updateMasterService);
router.delete('/:id', deleteMasterService);

export default router;
