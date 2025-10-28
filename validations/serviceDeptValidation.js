const Joi = require('joi');

const serviceDeptSchema = Joi.object({
    // Required fields
    ServiceDeptName: Joi.string()
        .max(250)
        .required()
        .messages({
            'string.base': 'ServiceDeptName must be a string',
            'string.empty': 'ServiceDeptName is required',
            'string.max': 'ServiceDeptName must be at most 250 characters',
            'any.required': 'ServiceDeptName is required'
        }),

    CampusID: Joi.number()
        .integer()
        .required()
        .messages({
            'number.base': 'CampusID must be a number',
            'any.required': 'CampusID is required'
        }),

    UserID: Joi.number()
        .integer()
        .required()
        .messages({
            'number.base': 'UserID must be a number',
            'any.required': 'UserID is required'
        }),

    // Optional fields
    Description: Joi.string()
        .max(250)
        .allow(null, ''),

    CCEmailToCSV: Joi.string()
        .max(250)
        .allow(null, ''),

    IsRequestTitleDisable: Joi.boolean()
        .allow(null),

    // Auto-managed fields (typically handled by the database)
    Created: Joi.date(),
    Modified: Joi.date()
});

module.exports = serviceDeptSchema;
