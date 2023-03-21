import { UserEntity } from './../../user/entities/user.entity';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { BaseDto } from './../../config/baseDto';
export class CreatePostDto extends BaseDto {
  @Expose()
  title: string;

  @Expose()
  image: string;

  @Expose()
  @IsNotEmpty()
  userId: UserEntity;
}
