import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateForumDto } from './dto/create-forum.dto';
import { ForumService } from './forum.service';

@Controller('forums')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Post('create')
  create(@Body() dto: CreateForumDto) {
    return this.forumService.create(dto);
  }

  @Get()
  findAll() {
    return this.forumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.forumService.findOne(id);
  }
}
