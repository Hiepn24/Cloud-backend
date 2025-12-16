import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { SocketGateway } from '../socket/socket.gateway';

interface CreatePostData {
  id?: number;
  title: string;
  content: string;
  user_id: number;
}

interface UpdatePostData {
  id: number;
  title: string;
  content: string;
}

@Injectable()
export class PostService {
    private readonly logger = new Logger(PostService.name);
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    private readonly socketGateway: SocketGateway,
  ) {}

  async getAllPost(){
    try {
        const post_list = await this.postRepository.find({
          relations: ['user'],
          order: { createdAt: 'DESC' }
        });
        return post_list;
    } catch (error) {
        this.logger.error(error)
        throw error
    }
  }

  async createNewPost(data: CreatePostData){
    try {
        const post = this.postRepository.create({
            id: data.id,
            title: data.title,
            content: data.content,
            user: { id: data.user_id }
        });
        await this.postRepository.save(post);

        // Emit real-time update
        this.socketGateway.emitNotesUpdated();

        return { message: "create new post success" }
    } catch (error) {
        this.logger.error(error)
        throw error
    }
  }

  async updatePost(data: UpdatePostData){
    try {
        await this.postRepository.update(
          { id: data.id },
          { title: data.title, content: data.content, updatedAt: new Date() }
        );

        // Emit real-time update
        this.socketGateway.emitNotesUpdated();

        return { message: "update post success" }
    } catch (error) {
        this.logger.error(error)
        throw error
    }
  }

  async deletePost(id: number){
    try {
        await this.postRepository.delete({ id });

        // Emit real-time update
        this.socketGateway.emitNotesUpdated();

        return { message: "delete post success" }
    } catch (error) {
        this.logger.error(error)
        throw error
    }
  }

  async updateOrder(notes: Post[]) {
    try {
      // Update order in database if needed
      // For now, just emit the new order
      this.socketGateway.emitOrderUpdated(notes);
      return { message: "order updated successfully" }
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }
}
