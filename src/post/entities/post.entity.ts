import { UserEntity } from './../../user/entities/user.entity';
import { BaseDatabase } from './../../config/baseDatabase';
import { Column, Entity, ManyToOne, JoinColumn, JoinTable } from 'typeorm';

@Entity({ name: 'posts' })
export class PostEntity extends BaseDatabase {
  @Column()
  title: string;

  @Column()
  image: string;

  @Column('uuid')
  userId: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  user: UserEntity;
}
