import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user_entity' })
export default class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ name: 'email', type: 'varchar' })
  email: string;

  @Column({ name: 'username', type: 'varchar', length: 32, unique: true, nullable: false })
  username: string;

  @Column({ name: 'password', type: 'text', nullable: false })
  password: string;

  @Column({ name: 'salt', type: 'varchar', length: 32, nullable: false })
  salt: string;

  @Column({ name: 'role', type: 'enum', enum: ['user', 'admin'] })
  role: 'user' | 'admin'

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: string | Date;
}