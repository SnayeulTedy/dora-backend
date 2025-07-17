import {  Controller,  Post,  UploadedFile,  UseInterceptors,  Body,  Get,  Param,  Delete,} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateForumPostDto } from '../dto/create-forum-post.dto';
import { ForumPostService } from './posts.service';

@Controller('post')
export class ForumPostController {
  constructor(private readonly forumPostService: ForumPostService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('media', {
    storage: diskStorage({
      destination: './uploads/forum-posts',
      filename: (req, file, cb) => {
        const ext = extname(file.originalname);
        const name = file.originalname.replace(ext, '').replace(/\s+/g, '-');
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${name}-${uniqueSuffix}${ext}`);
      }
    })
  }))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateForumPostDto,
  ) {
    const url_media = file ? `uploads/forum-posts/${file.filename}` : undefined;
    return this.forumPostService.create({ ...dto, url_media });
  }

  @Get()
  findAll() {
    return this.forumPostService.findAll();
  }

  @Get('forum/:forumId')
  findByForum(@Param('forumId') forumId: string) {
    return this.forumPostService.findByForum(forumId);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.forumPostService.delete(id);
  }
}
