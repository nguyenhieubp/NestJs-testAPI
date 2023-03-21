import { MessageModule } from './message/message.module';
import { PostEntity } from './post/entities/post.entity';
import { UserEntity } from './user/entities/user.entity';
import { AuthEntity } from './auth/entities/auth.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { FriendModule } from './friend/friend.module';
import { FriendEntity } from './friend/entities/friend.entity';
import {
  MessageEntity,
  ConversationEntity,
} from './message/entity/message.entity';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PostModule,
    FriendModule,
    MessageModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456789',
      database: 'matches',
      entities: [
        AuthEntity,
        UserEntity,
        PostEntity,
        FriendEntity,
        MessageEntity,
        ConversationEntity,
      ],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
