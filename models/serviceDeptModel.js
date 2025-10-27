const db = require('../config/database');
const queries = require('../queries/serviceDeptQueries');

module.exports = {
    getAll: async () => {
        try {
            const [results] = await db.query(queries.getAllDepts);
            return results;
        } catch (error) {
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const [results] = await db.query(queries.getDeptById, [id]);
            return results[0];
        } catch (error) {
            throw error;
        }
    },

    create: async (payload) => {
        try {
            const {
                ServiceDeptName,
                CampusID,
                Description,
                UserID,
                CCEmailToCSV,
                IsRequestTitleDisable
            } = payload;

            const [result] = await db.query(
                queries.createDept,
                [ServiceDeptName, CampusID, Description, UserID, CCEmailToCSV, IsRequestTitleDisable]
            );
            return { insertId: result.insertId };
        } catch (error) {
            throw error;
        }
    },

    update: async (id, payload) => {
        try {
            const {
                ServiceDeptName,
                CampusID,
                Description,
                UserID,
                CCEmailToCSV,
                IsRequestTitleDisable
            } = payload;

            const [result] = await db.query(
                queries.updateDept,
                [ServiceDeptName, CampusID, Description, UserID, CCEmailToCSV, IsRequestTitleDisable, id]
            );
            return result;
        } catch (error) {
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const [result] = await db.query(queries.deleteDept, [id]);
            return result;
        } catch (error) {
            throw error;
        }
    }
};