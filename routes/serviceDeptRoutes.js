const express = require('express');
const router = express.Router();
const controller = require('../controllers/serviceDeptController');

// GET all
router.get('/', controller.getAll);

// GET by id
router.get('/:id', controller.getById);

// CREATE
router.post('/', controller.create);

// UPDATE
router.put('/:id', controller.update);

// DELETE
router.delete('/:id', controller.delete);

module.exports = router;
