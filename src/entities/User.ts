import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column()
  email: string;

  @Column()
  phone: number;

  @Column({ nullable: true })
  pin: number;

  @Column()
  role: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: new Date() })
  createdAt: Date;
}
