// forum-post.entity.ts
import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Forum } from '../forum.entity';

@Entity()
export class ForumPost {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    titre: string;

    @Column()
    contenu: string;    

    @CreateDateColumn()
    date_post: Date;

    @Column({ nullable: true, type: 'varchar' })
    url_media: string | null;


    @ManyToOne(() => Forum, forum => forum.posts)
    forum: Forum;

    @ManyToOne(() => User)
    auteur: User;
}
