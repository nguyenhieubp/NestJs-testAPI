import { AuthDto } from './dto/auth.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() auth: AuthDto) {
    const authReal = AuthDto.plainToClass(auth);
    return this.authService.create(authReal);
  }

  @Get('/findByEmail')
  findAuth(@Body('email') email: string) {
    return this.authService.findByEmail(email);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Body() auth: AuthDto) {
    return this.authService.login(auth);
  }
}
