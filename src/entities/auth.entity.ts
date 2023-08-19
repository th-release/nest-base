import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'authEntity' })
export default class AuthEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;
}