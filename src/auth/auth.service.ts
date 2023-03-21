import { AuthEntity } from './entities/auth.entity';
import { AuthDto } from './dto/auth.dto';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly authEntity: Repository<AuthEntity>,
    private jwtService: JwtService,
  ) {}

  async create(auth: AuthDto): Promise<AuthDto> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(auth.password, saltOrRounds);
    return this.authEntity.save({ ...auth, password: hash });
  }

  async findByEmail(email: string): Promise<any> {
    return await this.authEntity.findOne({ where: { email: email } });
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.findByEmail(email);
    if (!user) throw new BadRequestException();
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async login(user: AuthDto) {
    const payload = { email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
