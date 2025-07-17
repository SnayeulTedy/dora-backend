import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
// import { CoutDeVie } from './cout-de-vie/cout-de-vie.entity';
import { EntryInfo } from '../fiche-pays/entry-info/entry-info.entity';
import { CoutDeVie } from '../fiche-pays/cout-de-vie/cout-de-vie.entity';
import { Culture } from '../fiche-pays/culture/culture.entity';
import { Education } from '../fiche-pays/education/education.entity';
import { Logement } from '../fiche-pays/logement/logement.entity';
import { MarcheDuTravail } from '../fiche-pays/marche-du-travail/marche-du-travail.entity';
import { Sante } from '../fiche-pays/sante/sante.entity';
import { Experience } from 'src/experience/experience.entity';
import { Favori } from 'src/favoris/favori.entity';


@Entity()
export class Pays {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code_iso: string;

  @Column()
  nom: string;

  @Column()
  continent: string;

  @Column()
  devise: string;

  @Column("text", { array: true })
  langue_officielle: string[];

  @Column()
  fuseau_horaire: string;

  @Column()
  url_drapeau: string;

  @OneToMany(() => Experience, experience => experience.pays)
  experiences: Experience[];

  @OneToMany(() => Favori, favori => favori.pays)
  favoris: Favori[];


  @OneToMany(() => EntryInfo, info => info.pays)
  entryInfos: EntryInfo[];

  @OneToMany(() => CoutDeVie, cv => cv.pays)
  coutDeVie: CoutDeVie[];

  @OneToMany(() => Logement, log => log.pays)
  logements: Logement[];

  @OneToMany(() => Sante, s => s.pays)
  sante: Sante[];

  @OneToMany(() => Education, edu => edu.pays)
  education: Education[];

  @OneToMany(() => MarcheDuTravail, m => m.pays)
  marcheTravail: MarcheDuTravail[];

  @OneToMany(() => Culture, c => c.pays)
  culture: Culture[];


}
