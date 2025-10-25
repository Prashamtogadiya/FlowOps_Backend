const db = require("../config/database"); // MySQL pool
const queries = require("../models/ServiceRequestStatusModel"); // SQL queries
const Joi = require("joi");
const serviceRequestStatusSchema = require("../validations/serviceRequestStatusValidation");

// list all statuses
const getAllStatuses = async (req, res) => {
  try {
    const [statuses] = await db.query(queries.getAllStatuses); // SELECT
    res.json(statuses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get status by id
const getStatusById = async (req, res) => {
  try {
    const [status] = await db.query(queries.getStatusById, [req.params.id]); // SELECT by id

    if (status && status.length > 0) {
      res.json(status[0]);
    } else {
      res.status(404).json({ message: "Status not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// create status
const createStatus = async (req, res) => {
  try {
    // validate input
    const { error, value } = serviceRequestStatusSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.details.map((d) => d.message),
      });
    }

    // convert booleans to 1/0
    const boolToInt = (val) => (val ? 1 : 0);

    const {
      ServiceRequestStatusName,
      ServiceRequestStatusSystemName,
      Sequence,
      Description,
      UserID,
      ServiceRequestStatusCssClass,
      IsOpen,
      IsNoFurtherActionRequired,
      IsAllowedForTechnician,
    } = value;

    // insert record (parameterized)
    const [result] = await db.query(queries.createStatus, [
      ServiceRequestStatusName,
      ServiceRequestStatusSystemName,
      Sequence,
      Description,
      UserID,
      ServiceRequestStatusCssClass,
      boolToInt(IsOpen),
      boolToInt(IsNoFurtherActionRequired),
      boolToInt(IsAllowedForTechnician),
    ]);

    // return created id
    res.status(201).json({ id: result.insertId, ...value });
  } catch (error) {
    console.error("DB Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// update status
const updateStatus = async (req, res) => {
  try {
    // validate input
    const { error, value } = serviceRequestStatusSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.details.map((d) => d.message),
      });
    }

    const {
      ServiceRequestStatusName,
      ServiceRequestStatusSystemName,
      Sequence,
      Description,
      UserID,
      ServiceRequestStatusCssClass,
      IsOpen,
      IsNoFurtherActionRequired,
      IsAllowedForTechnician,
    } = value;

    // update record (parameterized)
    const [result] = await db.query(queries.updateStatus, [
      ServiceRequestStatusName,
      ServiceRequestStatusSystemName,
      Sequence,
      Description,
      UserID,
      ServiceRequestStatusCssClass,
      IsOpen,
      IsNoFurtherActionRequired,
      IsAllowedForTechnician,
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Status not found" });
    }

    res.json({ message: "Status updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete status
const deleteStatus = async (req, res) => {
  try {
    const [result] = await db.query(queries.deleteStatus, [req.params.id]); // DELETE
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Status not found" });
    }
    res.json({ message: "Status deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllStatuses,
  getStatusById,
  createStatus,
  updateStatus,
  deleteStatus,
};
