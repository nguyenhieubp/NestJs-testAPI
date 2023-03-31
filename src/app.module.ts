import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
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
    MailModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: Number(process.env.PORT_DATABASE),
      username: 'root',
      password: process.env.PASSWORD_DATABASE,
      database: process.env.NAME_DATABASE,
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
