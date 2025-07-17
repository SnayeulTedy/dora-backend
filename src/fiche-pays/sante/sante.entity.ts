import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pays } from '../../pays/pays.entity';

@Entity()
export class Sante {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  acces_soins: string;

  @Column()
  assurance_obligatoire: boolean;

  @Column('text', { array: true })
  vaccins_recommandes: string[];

  @Column('decimal')
  densite_hopitaux: number;

  @Column('decimal')
  indice_qualite_sante: number;

  @Column({ type: 'timestamp' })
  date_mise_a_jour: Date;

  @ManyToOne(() => Pays, pays => pays.sante)
  pays: Pays;
}
