import { BaseDatabase } from './../../config/baseDatabase';
import { UserEntity } from './../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'auths' })
export class AuthEntity extends BaseDatabase {
  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => UserEntity, (user) => user.auth)
  user: UserEntity;
}
