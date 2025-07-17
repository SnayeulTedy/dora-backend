import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pays } from '../../pays/pays.entity';

@Entity()
export class Logement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { array: true })
  types_logement: string[];

  @Column('decimal')
  loyer_moyen_centre: number;

  @Column('decimal')
  loyer_moyen_banlieue: number;

  @Column('text', { array: true })
  quartiers_populaires: string[];

  @Column({ type: 'timestamp' })
  date_mise_a_jour: Date;

  @ManyToOne(() => Pays, pays => pays.logements)
  pays: Pays;
}
