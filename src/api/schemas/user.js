import Joi from '@hapi/joi';

export const userIdSchema = Joi
  .string()
  .regex(/^[0-9a-fA-F]{24}$/);

export const userSchema = {
    email: Joi
        .string()
        .min(3)
        .max(40)
        .required(),
    password: Joi
        .string()
        .min(3)
        .max(20)
        .required()
}

