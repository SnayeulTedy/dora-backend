import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Pays } from 'src/pays/pays.entity';
import { User } from 'src/users/user.entity';

@Entity()
export class Experience {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titre: string;

  @Column('text')
  contenu: string;

  @Column({ nullable: true })
  url_media: string;

  @CreateDateColumn()
  date_publication: Date;

  @ManyToOne(() => User, user => user.experiences)
  user: User;

  @ManyToOne(() => Pays, pays => pays.experiences)
  pays: Pays;
}
