import { UserEntity } from './../user/entities/user.entity';
import { PostEntity } from 'src/post/entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, UserEntity])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
