import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pays } from '../../pays/pays.entity';

@Entity()
export class CoutDeVie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal')
  indice_loyer: number;

  @Column('decimal')
  indice_alimentation: number;

  @Column('decimal')
  indice_transport: number;

  @Column('decimal')
  indice_general: number;

  @Column()
  devise_utilisee: string;

  @Column({ type: 'timestamp' })
  date_mise_a_jour: Date;

  @ManyToOne(() => Pays, pays => pays.coutDeVie)
  pays: Pays;
}
