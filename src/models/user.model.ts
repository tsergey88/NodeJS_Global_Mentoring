import Joi from '@hapi/joi';
import { DataTypes } from 'sequelize';

import { db } from '../db';

export const userValidateModel = Joi.object({
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

export const User = db.define('User', {
  login: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING
  },
  age: {
    type: DataTypes.INTEGER
  }
}, {
  timestamps: false
});