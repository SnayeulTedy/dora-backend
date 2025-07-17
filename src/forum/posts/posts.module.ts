import { Module } from '@nestjs/common';
import { ForumPostService } from './posts.service';
import { ForumPostController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForumPost } from './post.entity';
import { User } from 'src/users/user.entity';
import { ForumModule } from '../forum.module';

@Module({
  imports: [ TypeOrmModule.forFeature([ForumPost, User  ]), ForumModule],
  providers: [ForumPostService],
  controllers: [ForumPostController],
  exports: [ForumPostService, TypeOrmModule],
  
})
export class PostsModule {}
