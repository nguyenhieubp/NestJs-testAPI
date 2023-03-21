import { UserEntity } from './../../user/entities/user.entity';
import { BaseDto } from './../../config/baseDto';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateFriendDto extends BaseDto {
  @Expose()
  @IsNotEmpty()
  userId: UserEntity;

  @Expose()
  @IsNotEmpty()
  friendId: UserEntity;
}
