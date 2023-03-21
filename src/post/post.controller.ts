import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async createPost(@Body() post: CreatePostDto): Promise<CreatePostDto> {
    const postReal = CreatePostDto.plainToClass(post);
    return this.postService.createPost(postReal);
  }

  @Get()
  findAllPost() {
    return this.postService.findAllPost();
  }

  @Get('findById/:id')
  findPostById(@Param('id') id: string) {
    return this.postService.findPostById(id);
  }

  @Put('update/:id')
  updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<CreatePostDto | string> {
    return this.postService.updatePost(id, updatePostDto);
  }

  @Delete(':id')
  removePost(@Param('id') id: string) {
    return this.postService.removePost(id);
  }
}
