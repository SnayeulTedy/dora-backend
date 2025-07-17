import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pays } from '../../pays/pays.entity';

@Entity()
export class Education {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal')
  taux_alphabetisation: number;

  @Column('text', { array: true })
  principales_universites: string[];

  @Column('decimal')
  indice_qualite_education: number;

  @Column('int')
  duree_scolarite_obligatoire: number;

  @Column({ type: 'timestamp' })
  date_mise_a_jour: Date;

  @ManyToOne(() => Pays, pays => pays.education)
  pays: Pays;
}
