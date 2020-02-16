import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';

import { User, Group } from './index';

@Table({
  timestamps: false
})
export class UserGroup extends Model<UserGroup> {

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    comment: 'User ID'
  })
  userId: number;

  @ForeignKey(() => Group)
  @Column({
    type: DataType.INTEGER,
    comment: 'Group ID'
  })
  groupId: number;
}