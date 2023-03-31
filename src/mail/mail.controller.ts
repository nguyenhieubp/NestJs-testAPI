import { MailerService } from '@nestjs-modules/mailer/dist';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('mail')
export class MailController {
  constructor(private readonly mailerService: MailerService) {}

  @Get('plain-text-email')
  async plainTextEmail(@Query('toemail') toEmail) {
    var response = await this.mailerService.sendMail({
      to: toEmail,
      from: 'nguyenhieu11ka@gmail.com',
      subject: 'Siu ✔',
      text: 'Welcome NestJS Email Sending',
      html: ' <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2mCRhI2aaF6ZZYzyKS_55PpUUNcncz9ykon8OMwPuhw&s" alt="">',
    });
    return response;
  }
}
