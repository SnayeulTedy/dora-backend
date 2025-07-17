// forum.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { ForumPost } from './posts/post.entity';

@Entity()
export class Forum {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titre: string;

  @Column()
  description: string;

  @CreateDateColumn()
  date_creation: Date;

  @OneToMany(() => ForumPost, post => post.forum)
  posts: ForumPost[];
}
