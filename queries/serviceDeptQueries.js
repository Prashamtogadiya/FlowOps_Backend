const queries = {
    getAllDepts: `
        SELECT * FROM SER_ServiceDept
    `,
    getDeptById: `
        SELECT * FROM SER_ServiceDept
        WHERE ServiceDeptID = ?
    `,
    createDept: `
        INSERT INTO SER_ServiceDept (
            ServiceDeptName,
            CampusID,
            Description,
            UserID,
            Created,
            Modified,
            CCEmailToCSV,
            IsRequestTitleDisable
        ) VALUES (?, ?, ?, ?, NOW(), NOW(), ?, ?)
    `,
    updateDept: `
        UPDATE SER_ServiceDept
        SET
            ServiceDeptName = ?,
            CampusID = ?,
            Description = ?,
            UserID = ?,
            Modified = NOW(),
            CCEmailToCSV = ?,
            IsRequestTitleDisable = ?
        WHERE ServiceDeptID = ?
    `,
    deleteDept: `
        DELETE FROM SER_ServiceDept
        WHERE ServiceDeptID = ?
    `
};

module.exports = queries;
