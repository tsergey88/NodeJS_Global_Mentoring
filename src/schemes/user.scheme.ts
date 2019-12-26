import Joi from '@hapi/joi';

export const userScheme = Joi.object({
  login: Joi
    .string()
    .alphanum()
    .min(3)
    .required(),

  password: Joi
    .string()
    .pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/))
    .required(),

  age: Joi
    .number()
    .min(3)
    .max(130)
});
