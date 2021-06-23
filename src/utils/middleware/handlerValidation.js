const boom = require('@hapi/boom');
const Joi = require('@hapi/joi');

function validateSchema(data, schema) {
  const validSchema = Joi.object({
    schema
  })
  const { error } = validSchema.validate({ schema: data })
  return error
}

export function validationHandler(schema, check = 'body') {
  return function (req, res, next) {
    const error = validateSchema(req[check], schema);
    error ? next(boom.badRequest(error)) : next();
  };
}
