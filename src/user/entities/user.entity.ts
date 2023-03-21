import { BaseDatabase } from './../../config/baseDatabase';
import { AuthEntity } from './../../auth/entities/auth.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostEntity } from 'src/post/entities/post.entity';
import { FriendEntity } from 'src/friend/entities/friend.entity';
import { MessageEntity } from 'src/message/entity/message.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseDatabase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  avatar: string;

  @Column()
  gender: string;

  @Column()
  age: number;

  @Column()
  address: string;

  @OneToOne(() => AuthEntity, (auth) => auth.id)
  @JoinColumn()
  auth: AuthEntity;

  @OneToMany(() => PostEntity, (post) => post.user, { cascade: true })
  posts: PostEntity[];

  @OneToMany(() => FriendEntity, (friend) => friend.friend)
  friends: FriendEntity[];

  @OneToMany(() => MessageEntity, (message) => message.user)
  messages: MessageEntity[];
}
