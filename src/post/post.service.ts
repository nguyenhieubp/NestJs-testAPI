import { PostEntity } from 'src/post/entities/post.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async createPost(post: CreatePostDto): Promise<CreatePostDto> {
    return await this.postRepository.save(post);
  }

  async findAllPost(): Promise<CreatePostDto[]> {
    return await this.postRepository
      .createQueryBuilder('posts')
      .leftJoinAndSelect('posts.user', 'user')
      .getMany();
  }

  async findPostById(id: string): Promise<CreatePostDto | string> {
    try {
      const post = await this.postRepository.findOneById(id);
      if (post) {
        return post;
      } else {
        return 'not have post';
      }
    } catch (error) {
      return error;
    }
  }

  async updatePost(
    id: string,
    updatePostDto: UpdatePostDto,
  ): Promise<CreatePostDto> {
    try {
      await this.postRepository.update(id, updatePostDto);
      return await this.postRepository.findOneById(id);
    } catch (error) {
      return error;
    }
  }

  async removePost(id: string): Promise<string> {
    try {
      await this.postRepository.delete(id);
      return 'DELETE SUCCESS';
    } catch (error) {
      return error;
    }
  }
}
