const db = require("../config/database"); // MySQL pool
const ServiceRequestStatusModel = require("../models/ServiceRequestStatusModel");
const serviceRequestStatusSchema = require("../validations/serviceRequestStatusValidation");

// list all statuses
const getAllStatuses = async (req, res) => {
  try {
    const [statuses] = await ServiceRequestStatusModel.getAllStatuses();
    res.json(statuses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get status by id
const getStatusById = async (req, res) => {
  try {
    const [rows] = await ServiceRequestStatusModel.getStatusById(req.params.id);
    if (rows && rows.length > 0) {
      res.json(rows[0]);
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
    // validate input (route also validates, this is defensive)
    const { error, value } = serviceRequestStatusSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.details.map((d) => d.message),
      });
    }

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

    const [result] = await ServiceRequestStatusModel.createStatus(
      ServiceRequestStatusName,
      ServiceRequestStatusSystemName,
      Sequence,
      Description,
      UserID,
      ServiceRequestStatusCssClass,
      boolToInt(IsOpen),
      boolToInt(IsNoFurtherActionRequired),
      boolToInt(IsAllowedForTechnician)
    );

    res.status(201).json({ id: result.insertId, ...value });
  } catch (error) {
    console.error("DB Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// update status
const updateStatus = async (req, res) => {
  try {
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

    const [result] = await ServiceRequestStatusModel.updateStatus(
      ServiceRequestStatusName,
      ServiceRequestStatusSystemName,
      Sequence,
      Description,
      UserID,
      ServiceRequestStatusCssClass,
      IsOpen ? 1 : 0,
      IsNoFurtherActionRequired ? 1 : 0,
      IsAllowedForTechnician ? 1 : 0,
      req.params.id
    );

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
    const [result] = await ServiceRequestStatusModel.deleteStatus(req.params.id);
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
