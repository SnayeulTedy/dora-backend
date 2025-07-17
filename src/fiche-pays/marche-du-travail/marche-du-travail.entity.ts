import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pays } from '../../pays/pays.entity';

@Entity()
export class MarcheDuTravail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { array: true })
  secteurs_majeurs: string[];

  @Column('decimal')
  salaire_moyen: number;

  @Column('decimal')
  taux_chomage: number;

  @Column('text', { array: true })
  metiers_en_tension: string[];

  @Column('int')
  nombre_offres_emploi: number;

  @Column({ type: 'timestamp' })
  date_mise_a_jour: Date;

  @ManyToOne(() => Pays, pays => pays.marcheTravail)
  pays: Pays;
}
