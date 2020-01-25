import Joi from '@hapi/joi';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

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

@Table({
  timestamps: false
})
export class User extends Model<User> {
 
  @Column({
    type: DataType.STRING(200),
    comment: 'User`s login'
  })
  login: string;
 
  @Column({
    type: DataType.STRING(100),
    comment: 'User`s password'
  })
  password: string;

  @Column({
    type: DataType.INTEGER,
    comment: 'User`s age'
  })
  age: number;
}