import { AuthService } from './../auth/auth.service';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { UserDto } from './dto/user.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createUser(@Body() user: UserDto, @Request() req: any) {
    const { email } = req.user;
    const { id } = await this.authService.findByEmail(email);
    const userReal = UserDto.plainToClass(user);
    return this.userService.createUser(userReal, id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() valueUserUpdate: any,
  ): Promise<UserDto> {
    return this.userService.updateUser(valueUserUpdate, id);
  }
}
