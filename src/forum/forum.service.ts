import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Forum } from './forum.entity';
import { CreateForumDto } from './dto/create-forum.dto';

@Injectable()
export class ForumService {
  constructor(
    @InjectRepository(Forum)
    private forumRepo: Repository<Forum>,
  ) {}

  create(data: CreateForumDto) {
    const forum = this.forumRepo.create(data);
    return this.forumRepo.save(forum);
  }

  findAll() {
    return this.forumRepo.find();
  }

  findOne(id: string) {
    return this.forumRepo.findOne({ where: { id } });
  }
}
