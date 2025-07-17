import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pays } from 'src/pays/pays.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Experience } from './experience.entity';
import { CreateExperienceDto } from './dto/create-experience.dto';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectRepository(Experience)
    private readonly experienceRepo: Repository<Experience>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Pays)
    private readonly paysRepo: Repository<Pays>,
  ) { }


  async create(data: CreateExperienceDto) {
    const pays = await this.paysRepo.findOne({ where: { id: data.paysId } });
    const user = await this.userRepo.findOne({ where: { id: data.userId } });

    if (!pays) throw new Error('Pays introuvable');
    if (!user) throw new Error('Utilisateur introuvable');

    const experience = this.experienceRepo.create({
      titre: data.titre,
      contenu: data.contenu,
      url_media: data.url_media,
      pays,
      user,
    });

    const exp = await this.experienceRepo.save(experience);

    return {
      id: exp.id,
      titre: exp.titre,
      contenu: exp.contenu,
      url_media: exp.url_media,
      date_publication: exp.date_publication,
      user: {
        id: user.id,
        nom: user.nom,
        email: user.email,
      },
      pays: {
        id: pays.id,
        nom: pays.nom,
      },
    };
  }

  async update(id: string, data: CreateExperienceDto) {
    const experience = await this.experienceRepo.findOne({ where: { id } });
    if (!experience) throw new Error('Experience introuvable');
    const pays = await this.paysRepo.findOne({ where: { id: data.paysId } });
    const user = await this.userRepo.findOne({ where: { id: data.userId } });
    if (!pays) throw new Error('Pays introuvable');
    if (!user) throw new Error('Utilisateur introuvable');
    experience.titre = data.titre;
    experience.contenu = data.contenu;
    experience.url_media = data.url_media ?? '';
    experience.pays = pays;
    experience.user = user;

    const exp = await this.experienceRepo.save(experience);
    return {
      id: exp.id,
      titre: exp.titre,
      contenu: exp.contenu,
      url_media: exp.url_media,
      date_publication: exp.date_publication,
      user: {
        id: user.id,
        nom: user.nom,
        email: user.email,
      },
      pays: {
        id: pays.id,
        nom: pays.nom,
      },
    };
  }

  async delete(id: string) {
    const experience = await this.experienceRepo.findOne({ where: { id } });
    if (!experience) throw new Error('Experience introuvable');
    await this.experienceRepo.delete(id);
    return { message: 'Experience supprimée avec succès' };
  }

  async findAll() {
    const exp = await this.experienceRepo.find({
      relations: ['user', 'pays'],
      order: { date_publication: 'DESC' },
    });
    return exp.map(experience => ({
      id: experience.id,
      titre: experience.titre,
      contenu: experience.contenu,
      url_media: experience.url_media,
      date_publication: experience.date_publication,
      user: {
        id: experience.user.id,
        nom: experience.user.nom,
      },
      pays: {
        id: experience.pays.id,
        nom: experience.pays.nom,
      },
    }));
  }

  async findByPays(paysId: string) {
    return this.experienceRepo.find({
      where: { pays: { id: paysId } },
      relations: ['user', 'pays'],
      order: { date_publication: 'DESC' },
    });
  }


}
