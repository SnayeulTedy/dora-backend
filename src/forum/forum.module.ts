import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Forum } from './forum.entity';
import { ForumService } from './forum.service';
import { ForumController } from './forum.controller';
import { ForumPost } from './posts/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Forum, ForumPost])],
  providers: [ForumService],
  controllers: [ForumController],
  exports: [ForumService, TypeOrmModule],
})
export class ForumModule {}
