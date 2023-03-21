import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { FriendService } from './friend.service';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { Query } from '@nestjs/common/decorators';

@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Post()
  create(@Body() friend: CreateFriendDto) {
    const friendRead = CreateFriendDto.plainToClass(friend);
    return this.friendService.create(friendRead);
  }

  @Post('confirm')
  async confirm(
    @Body('friendId') friendId: UserEntity,
    @Body('userId') userId: UserEntity,
  ) {
    return this.friendService.confirm(friendId, userId);
  }

  @Get(':id')
  async findFriendOfUser(@Param('id') id: UserEntity) {
    return await this.friendService.findFriendOfUser(id);
  }

  @Delete()
  blockFriend(
    @Body('friendId') friendId: UserEntity,
    @Body('userId') userId: UserEntity,
  ) {
    return this.friendService.blockFriend(friendId, userId);
  }
}
