import { MailController } from './mail.controller';
import { Module } from '@nestjs/common/decorators';
import { MailerModule } from '@nestjs-modules/mailer';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  controllers: [MailController],
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        secure: false,
        auth: {
          user: 'nguyenhieu11ka@gmail.com',
          pass: process.env.PASSWORD_MAIL,
        },
      },
    }),
  ],
})
export class MailModule {}
