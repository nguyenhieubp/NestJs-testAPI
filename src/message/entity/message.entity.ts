import { UserEntity } from 'src/user/entities/user.entity';
import { BaseDatabase } from 'src/config/baseDatabase';
import {
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  Entity,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'conversations' })
export class ConversationEntity extends BaseDatabase {
  @Column('uuid')
  url_conversation: string;

  @OneToMany(() => MessageEntity, (message) => message.conversation)
  messages: MessageEntity[];
}

//CREATE TABLE MESSAGE
@Entity({ name: 'messages' })
export class MessageEntity extends BaseDatabase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @Column('uuid')
  userId: UserEntity;

  @Column('uuid')
  conversationId: ConversationEntity;

  @ManyToOne(() => UserEntity, (user) => user.messages)
  user: UserEntity;

  @ManyToOne(() => ConversationEntity, (conversation) => conversation.messages)
  conversation: UserEntity;
}
