import { Pays } from 'src/pays/pays.entity';
import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
@Entity()
export class Favori {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.favoris, { eager: true })
  user: User;

  @ManyToOne(() => Pays, pays => pays.favoris, { eager: true })
  pays: Pays;

  @CreateDateColumn()
  date_ajout: Date;
}
