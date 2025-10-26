const express = require('express');
// router instance
const router = express.Router();
// controller functions
const { 
    getAllStatuses, 
    getStatusById, 
    createStatus, 
    updateStatus, 
    deleteStatus 
} = require('../controllers/serviceRequestStatusController');
// validation middleware and schema
const validate = require('../middleware/validateRequest');
const serviceRequestStatusSchema = require('../validations/serviceRequestStatusValidation');

// GET /         -> list statuses
router.get('/', getAllStatuses);
// GET /:id      -> get a status
router.get('/:id', getStatusById);
// POST /        -> create status (validate body)
router.post('/', validate(serviceRequestStatusSchema), createStatus);
// PUT /:id      -> update status (validate body)
router.put('/:id', validate(serviceRequestStatusSchema), updateStatus);   
// DELETE /:id   -> delete status
router.delete('/:id', deleteStatus);

// export router
module.exports = router;
