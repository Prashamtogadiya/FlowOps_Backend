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

// GET /         -> list statuses
router.get('/', getAllStatuses);
// GET /:id      -> get a status
router.get('/:id', getStatusById);
// POST /        -> create status
router.post('/', createStatus);
// PUT /:id      -> update status
router.put('/:id', updateStatus);   
// DELETE /:id   -> delete status
router.delete('/:id', deleteStatus);

// export router
module.exports = router;
