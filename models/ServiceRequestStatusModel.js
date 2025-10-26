const db = require('../config/database');
const q = require('../queries/serviceRequestStatusQueries');

// Thin model that runs parameterized SQL and returns promise results.
module.exports = {
  getAllStatuses: () => db.query(q.getAllStatuses),
  getStatusById: (id) => db.query(q.getStatusById, [id]),
  createStatus: (
    ServiceRequestStatusName,
    ServiceRequestStatusSystemName,
    Sequence,
    Description,
    UserID,
    ServiceRequestStatusCssClass,
    IsOpen,
    IsNoFurtherActionRequired,
    IsAllowedForTechnician
  ) =>
    db.query(q.createStatus, [
      ServiceRequestStatusName,
      ServiceRequestStatusSystemName,
      Sequence,
      Description,
      UserID,
      ServiceRequestStatusCssClass,
      IsOpen,
      IsNoFurtherActionRequired,
      IsAllowedForTechnician,
    ]),
  updateStatus: (
    ServiceRequestStatusName,
    ServiceRequestStatusSystemName,
    Sequence,
    Description,
    UserID,
    ServiceRequestStatusCssClass,
    IsOpen,
    IsNoFurtherActionRequired,
    IsAllowedForTechnician,
    id
  ) =>
    db.query(q.updateStatus, [
      ServiceRequestStatusName,
      ServiceRequestStatusSystemName,
      Sequence,
      Description,
      UserID,
      ServiceRequestStatusCssClass,
      IsOpen,
      IsNoFurtherActionRequired,
      IsAllowedForTechnician,
      id,
    ]),
  deleteStatus: (id) => db.query(q.deleteStatus, [id]),
};
