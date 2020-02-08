import Joi from '@hapi/joi';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

import { Permissions } from '../interfaces';

export const groupValidateModel = Joi.object({
	name: Joi
		.string()
		.required(),

	permissions: Joi
		.array()
});

@Table({
	timestamps: false
})
export class Group extends Model<Group> {

	@Column({
		type: DataType.STRING(200),
		comment: 'Name of user group'
	})
	name: string;

	@Column({
		type: DataType.ARRAY(DataType.STRING),
		comment: 'User`s password'
	})
	permissions: Array<Permissions>;
}