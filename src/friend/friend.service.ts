import { UserEntity } from './../user/entities/user.entity';
import { FriendEntity } from 'src/friend/entities/friend.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { Repository } from 'typeorm';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(FriendEntity)
    private readonly friendRepository: Repository<FriendEntity>,
  ) {}

  async create(friend: CreateFriendDto) {
    try {
      return await this.friendRepository.save(friend);
    } catch (error) {
      return error;
    }
  }

  async confirm(friendId: UserEntity, userId: UserEntity) {
    try {
      const friendUpdate = await this.friendRepository.findOne({
        where: { userId: userId, friendId: friendId },
      });

      //update isFriend
      const friend = await this.friendRepository.save({
        ...friendUpdate,
        isFriend: true,
      });

      //create Fiend for user
      const friendConfirm = new FriendEntity();
      friendConfirm.friendId = userId;
      friendConfirm.userId = friendId;
      friendConfirm.isFriend = true;
      await this.friendRepository.save(friendConfirm);

      return this.friendRepository.find({
        relations: { user: true, friend: true },
        where: { id: friend.id },
      });
      // ---- Query follow createQueryBuild:
      await this.friendRepository
        .createQueryBuilder('friends')
        .update(FriendEntity)
        .set({ isFriend: true })
        .where('userId = :userId AND friendId =:friendId', {
          userId: userId,
          friendId: friendId,
        })
        .execute();
    } catch (error) {
      return error;
    }
  }

  async findFriendOfUser(id: UserEntity) {
    return await this.friendRepository
      .createQueryBuilder('friends')
      .where('userId =:id AND isBlock = false ', { id: id })
      .leftJoinAndSelect('friends.user', 'user')
      .leftJoinAndSelect('friends.friend', 'friend')
      .getMany();
  }

  async blockFriend(friendId: UserEntity, userId: UserEntity) {
    await this.friendRepository
      .createQueryBuilder('friends')
      .update(FriendEntity)
      .set({ isBlock: true, isFriend: false })
      .where(
        'userId= :userId AND friendId =:friendId OR userId= :friendId AND friendId =:userId ',
        { friendId, userId },
      )
      .execute();
    return 'BLOCK SUCCESS';
  }
}
