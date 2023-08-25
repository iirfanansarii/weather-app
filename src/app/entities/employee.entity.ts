import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity({ name: 'employees' })
export class EmployeeEntity {
  @PrimaryColumn({ length: 100, name: 'id' })
  userId: string;

  @Column({ length: 100, name: 'name' })
  username: string;

  @Column({ name: 'email', nullable: false })
  emailAddress: string;

  @Column({ name: 'access_type_id', length: 50 })
  accessTypeId: string;

  @Column({ name: 'has_global_access' })
  hasGlobalAccess: boolean;

  @Column({ name: 'role_id', length: 50 })
  roleId: string;

  @Column({ name: 'phone_number', nullable: false })
  phoneNumber: string;

  @Column({ name: 'pin', nullable: true })
  pin: number;

  @Column({ name: 'password', nullable: true })
  password: string;

  @Column({ name: 'is_active' })
  isActive: boolean;

  @Column({ name: 'is_deleted' })
  isDeleted: boolean;

  @Column({ length: 100, name: 'created_by', nullable: false })
  createdBy: string;

  @Column({ length: 100, name: 'updated_by' })
  updatedBy: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @VersionColumn({ name: 'version' })
  version: number;
}
