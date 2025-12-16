import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./post.entity";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { SocketModule } from "../socket/socket.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Post]),
        SocketModule // Import để PostService có thể inject SocketGateway
    ],
    providers: [PostService],
    controllers: [PostController]
})
export class PostModule {}