import { UserEntity } from './../../user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { BaseDatabase } from './../../config/baseDatabase';

@Entity({ name: 'friends' })
export class FriendEntity extends BaseDatabase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: UserEntity;

  @Column('uuid')
  friendId: UserEntity;

  @Column({ type: 'boolean', default: false })
  isFriend: boolean;

  @Column({ type: 'boolean', default: false })
  isBlock: boolean;

  @ManyToOne(() => UserEntity, (user) => user.friends)
  user: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.friends)
  friend: UserEntity;
}
