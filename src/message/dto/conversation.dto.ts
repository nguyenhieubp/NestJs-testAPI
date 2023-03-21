import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { BaseDto } from 'src/config/baseDto';

export class ConversationDto extends BaseDto {
  @Expose()
  url_conversation: string;
}
