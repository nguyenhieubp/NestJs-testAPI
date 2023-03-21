import { AuthEntity } from './../../auth/entities/auth.entity';
import { BaseDto } from '../../config/baseDto';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';

enum Gender {
  Man = 'Man',
  Woman = 'Woman',
  man = 'man',
  woman = 'woman',
}

export class UserDto extends BaseDto {
  @Expose()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsNotEmpty()
  avatar: string;

  @Expose()
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: string;

  @Expose()
  @IsNotEmpty()
  age: number;

  @Expose()
  @IsNotEmpty()
  address: string;

  @Expose()
  auth: AuthEntity;
}
