import { ConversationDto } from './dto/conversation.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { ConversationEntity, MessageEntity } from './entity/message.entity';
import { Server, Socket } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';
import * as uuid from 'uuid';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import {
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@WebSocketGateway({ cors: { origin: '*' } })
export class messageGateway implements OnModuleInit {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    @InjectRepository(ConversationEntity)
    private readonly conversationRepository: Repository<ConversationEntity>,
  ) {}
  @WebSocketServer()
  server: Server;

  onModuleInit(): void {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('connected');
    });
  }

  @SubscribeMessage('newMessage')
  async handleMessage(
    client: Socket,
    data: {
      message: string;
      user: UserEntity;
      conversation?: ConversationDto;
      name: string;
    },
  ) {
    if (data.conversation) {
      await this.messageRepository.save({
        conversationId: data.conversation,
        text: data.message,
        userId: data.user,
      });

      console.log(data.conversation, 'data conversation');

      client.join(data.conversation.toString());
      this.server.to(data.conversation.toString()).emit('chat message', data);
    } else {
      //CREATE URL CONVERSATION
      const url_conversation: string = uuid.v4();

      //SAVE CONVERSATION TO DATABASE
      const conversation = await this.conversationRepository.save({
        url_conversation: url_conversation,
      });

      //SAVE NEW MASSAGE
      await this.messageRepository.save({
        conversationId: conversation,
        text: data.message,
        userId: data.user,
      });

      const dataEmit = { ...data, conversation: conversation.id };
      console.log(conversation.id, 'create');
      client.join(conversation.id);
      this.server.to(conversation.id).emit('chat message', dataEmit);
    }
  }
}
