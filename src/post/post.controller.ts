import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostEntity } from './post.entity';

interface CreatePostDto {
  title: string;
  content: string;
  user_id: number;
}

interface UpdatePostDto {
  id: number;
  title: string;
  content: string;
}

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAllPost(): Promise<PostEntity[]> {
    return await this.postService.getAllPost();
  }

  @Post()
  async createNewPost(@Body() data: CreatePostDto) {
    return await this.postService.createNewPost(data);
  }

  @Put()
  async updatePost(@Body() data: UpdatePostDto) {
    return await this.postService.updatePost(data);
  }

  @Put('order')
  async updateOrder(@Body() notes: PostEntity[]) {
    return await this.postService.updateOrder(notes);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    return await this.postService.deletePost(parseInt(id));
  }
}
