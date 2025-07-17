import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pays } from '../../pays/pays.entity';


@Entity()
export class EntryInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  visa_requis: boolean;

  @Column('text', { array: true, nullable:true },)
  types_visa: string[];

  @Column('text')
  conditions_entree: string;

  @Column('text', { array: true })
  exigences_sanitaires: string[];

  @Column()
  duree_sejour_autorisee: string;

  @Column({ type: 'timestamp' })
  date_mise_a_jour: Date;

  @ManyToOne(() => Pays, pays => pays.entryInfos)
  pays: Pays;
}
