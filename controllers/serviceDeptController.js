const model = require('../models/serviceDeptModel');

module.exports = {
    getAll: async (req, res) => {
        try {
            const rows = await model.getAll();
            res.json(rows);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getById: async (req, res) => {
        try {
            const id = req.params.id;
            const row = await model.getById(id);
            if (!row) return res.status(404).json({ message: 'Not found' });
            res.json(row);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    create: async (req, res) => {
        try {
            const payload = req.body;
            const result = await model.create(payload);
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const id = req.params.id;
            const payload = req.body;
            await model.update(id, payload);
            res.json({ message: 'Updated' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            const id = req.params.id;
            await model.delete(id);
            res.json({ message: 'Deleted' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};
