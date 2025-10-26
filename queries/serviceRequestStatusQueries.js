const queries = {
    getAllStatuses: `
        SELECT * FROM SER_ServiceRequestStatus
    `,
    getStatusById: `
        SELECT * FROM SER_ServiceRequestStatus 
        WHERE ServiceRequestStatusID = ?
    `,
    createStatus: `
        INSERT INTO SER_ServiceRequestStatus (
            ServiceRequestStatusName,
            ServiceRequestStatusSystemName,
            Sequence,
            Description,
            UserID,
            Created,
            Modified,
            ServiceRequestStatusCssClass,
            IsOpen,
            IsNoFurtherActionRequired,
            IsAllowedForTechnician
        ) VALUES (?, ?, ?, ?, ?, NOW(), NOW(), ?, ?, ?, ?)
    `,
    updateStatus: `
        UPDATE SER_ServiceRequestStatus 
        SET 
            ServiceRequestStatusName = ?,
            ServiceRequestStatusSystemName = ?,
            Sequence = ?,
            Description = ?,
            UserID = ?,
            Modified = NOW(),
            ServiceRequestStatusCssClass = ?,
            IsOpen = ?,
            IsNoFurtherActionRequired = ?,
            IsAllowedForTechnician = ?
        WHERE ServiceRequestStatusID = ?
    `,
    deleteStatus: `
        DELETE FROM SER_ServiceRequestStatus 
        WHERE ServiceRequestStatusID = ?
    `
};

module.exports = queries;
