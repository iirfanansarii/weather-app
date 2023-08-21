import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'FRYDAY_FLAVORS_USERS' })
export class UserEntity {
  @PrimaryColumn({ length: 100, name: 'USER_ID' })
  value: string;

  @Column({ length: 100, name: 'USERNAME' })
  name: string;

  @Column({ name: 'EMAILADDRESS', nullable: false })
  email: string;

  @Column({ name: 'FFAID', length: 50 })
  accessTypeId: string;

  @Column({ name: 'HAS_GLOBAL_ACCESS' })
  hasGlobalAccess: boolean;

  @Column({ name: 'FFRID', length: 50 })
  roleId: string;

  @Column({ name: 'PHONENUMBER', nullable: false })
  phoneNumber: number;

  @Column({ name: 'PIN', nullable: true })
  pin: number;

  @Column({ name: 'USERROLE', nullable: false })
  role: string;

  @Column({ name: 'ISACTIVE' })
  isActive: boolean;

  @Column({ name: 'IS_DELETED' })
  isDeleted: boolean;

  @Column({ length: 100, name: 'CREATED_BY', nullable: false })
  createdBy: string;

  @Column({ length: 100, name: 'UPDATED_BY' })
  updatedBy: string;

  @Column({ name: 'CREATE_AT', nullable: false })
  createdAt: Date;

  @Column({ name: 'UPDATE_AT' })
  updatedAt: Date;
}
