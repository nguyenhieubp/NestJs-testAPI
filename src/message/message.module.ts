import { messageGateway } from './message.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MessageEntity, ConversationEntity } from './entity/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity, ConversationEntity])],
  providers: [messageGateway],
})
export class MessageModule {}
