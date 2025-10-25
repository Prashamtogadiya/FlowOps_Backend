const Joi = require('joi');

// validation schema
const serviceRequestStatusSchema = Joi.object({
  // display name (required)
  ServiceRequestStatusName: Joi.string()
    .max(250)
    .required()
    .messages({
      'string.base': 'ServiceRequestStatusName must be a string',
      'string.empty': 'ServiceRequestStatusName is required',
      'string.max': 'ServiceRequestStatusName must be at most 250 characters',
      'any.required': 'ServiceRequestStatusName is required'
    }),

  // system name (required)
  ServiceRequestStatusSystemName: Joi.string()
    .max(100)
    .required(),

  // order value (optional)
  Sequence: Joi.number()
    .precision(2)
    .allow(null)
    .messages({ 'number.base': 'Sequence must be a number' }),

  // description (optional)
  Description: Joi.string()
    .max(250)
    .allow(null, ''),

  // user id (required)
  UserID: Joi.number()
    .integer()
    .required()
    .messages({ 'any.required': 'UserID is required' }),

  // css class (optional)
  ServiceRequestStatusCssClass: Joi.string()
    .max(250)
    .allow(null, ''),

  // boolean flags (required)
  IsOpen: Joi.boolean()
    .required()
    .messages({ 'boolean.base': 'IsOpen must be true or false' }),

  IsNoFurtherActionRequired: Joi.boolean()
    .required(),

  IsAllowedForTechnician: Joi.boolean()
    .required(),
});

module.exports = serviceRequestStatusSchema;
