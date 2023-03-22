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
import { UserEntity } from 'src/user/entities/user.entity';

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

  @Post('refuse')
  async refuse(
    @Body('friendId') friendId: UserEntity,
    @Body('userId') userId: UserEntity,
  ) {
    return this.friendService.refuse(friendId, userId);
  }

  @Get('allFriend/:id')
  async findFriendOfUser(@Param('id') id: UserEntity) {
    return await this.friendService.findFriendOfUser(id);
  }

  @Get('allAwaitFriend/:id')
  async allAwaitFriend(@Param('id') id: UserEntity) {
    return await this.friendService.allAwaitFriend(id);
  }

  @Delete()
  blockFriend(
    @Body('friendId') friendId: UserEntity,
    @Body('userId') userId: UserEntity,
  ) {
    return this.friendService.blockFriend(friendId, userId);
  }
}
