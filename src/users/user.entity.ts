import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IsOptional } from 'class-validator';
import { UserRole } from './enum/roles.enum';
import { Experience } from 'src/experience/experience.entity';
import { Favori } from 'src/favoris/favori.entity';
import { ForumPost } from 'src/forum/posts/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nom: string;

  @Column()
  email: string;

  @Column({ type: 'date', nullable: true })
  @IsOptional()
  date_naissance: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date_creation: Date;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.User,
  })
  role: UserRole;

  @Column()
  password: string;

  @Column({ type: 'timestamp', nullable: true })
  delete_date?: Date | null;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Experience, experience => experience.user)
  experiences: Experience[];

  @OneToMany(() => Favori, favori => favori.user)
  favoris: Favori[];

   @OneToMany(() => ForumPost, (post) => post.auteur)
    forumPosts: ForumPost[];
    
  //   // Relations ajoutées
  //   @OneToMany(() => Dossier, (dossier) => dossier.user)
  //   dossiers: Dossier[];


 

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return bcrypt.compare(attempt, this.password);
  }
}
