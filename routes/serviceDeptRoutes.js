const express = require('express');
const router = express.Router();
const validate = require('../middleware/validateRequest');
const serviceDeptSchema = require('../validations/serviceDeptValidation');

const controller = require('../controllers/serviceDeptController');

// GET all
router.get('/', controller.getAll);

// GET by id
router.get('/:id', controller.getById);

// CREATE
router.post('/',  validate(serviceDeptSchema),controller.create);

// UPDATE
router.put('/:id',  validate(serviceDeptSchema), controller.update);

// DELETE
router.delete('/:id', controller.delete);

module.exports = router;
