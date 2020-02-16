import Joi from '@hapi/joi';
import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';

import { Permissions } from '../interfaces';
import { User, UserGroup } from './index';

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
  
  @BelongsToMany(() => User, () => UserGroup, 'groupId', 'userId')
  users: User[];
}