import { FriendEntity } from './entities/friend.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FriendEntity])],
  controllers: [FriendController],
  providers: [FriendService],
})
export class FriendModule {}
