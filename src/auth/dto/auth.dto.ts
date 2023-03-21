import { BaseDto } from '../../config/baseDto';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { IsEmail, Length } from 'class-validator';

export class AuthDto extends BaseDto {
  @IsEmail()
  @IsNotEmpty()
  @Expose()
  email: string;

  @Length(8)
  @IsNotEmpty()
  @Expose()
  password: string;
}
