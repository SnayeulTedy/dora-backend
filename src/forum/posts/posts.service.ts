import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Forum } from '../forum.entity';
import { User } from '../../users/user.entity';
import { CreateForumPostDto } from '../dto/create-forum-post.dto';
import { ForumPost } from './post.entity';

@Injectable()
export class ForumPostService {
    constructor(
        @InjectRepository(ForumPost)
        private readonly postRepo: Repository<ForumPost>,

        @InjectRepository(Forum)
        private readonly forumRepo: Repository<Forum>,

        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) { }

    async create(data: CreateForumPostDto) {
        const forum = await this.forumRepo.findOne({ where: { id: data.forumId } });
        const user = await this.userRepo.findOne({ where: { id: data.userId } });

        if (!forum) throw new Error('Forum introuvable');
        if (!user) throw new Error('Utilisateur introuvable');

        const post = this.postRepo.create({
            titre: data.titre,
            contenu: data.contenu,
            url_media: data.url_media ?? null,
            forum,
            auteur: user,
        });

        return this.postRepo.save(post);
    }

    async findAll() {
        const posts = await this.postRepo.find({ relations: ['forum', 'auteur'] });
        return posts.map(post => ({
            titre: post.titre,
            contenu: post.contenu,
            date_post: post.date_post,
            url_media: post.url_media,
            forum: {
                titre: post.forum.titre,
            },
            auteur: {
                nom: post.auteur.nom,
            },
        }));

    }

    async findByForum(forumId: string) {
        return this.postRepo.find({
            where: { forum: { id: forumId } },
            relations: ['forum', 'auteur'],
        });
    }

    async delete(id: string) {
        await this.postRepo.delete(id);
    }
}
