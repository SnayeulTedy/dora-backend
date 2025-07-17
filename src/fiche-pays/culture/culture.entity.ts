import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pays } from '../../pays/pays.entity';

@Entity()
export class Culture {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { array: true })
  langues_parlees: string[];

  @Column('text')
  coutumes: string;

  @Column('text')
  code_vestimentaire: string;

  @Column('text', { array: true })
  fetes_majeures: string[];

  @Column('text')
  restrictions_legales: string;

  @Column('text')
  comportements_sociaux: string;

  @Column({ type: 'timestamp' })
  date_mise_a_jour: Date;

  @ManyToOne(() => Pays, pays => pays.culture)
  pays: Pays;
}
