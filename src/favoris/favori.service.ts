import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pays } from 'src/pays/pays.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Favori } from './favori.entity';

@Injectable()
export class FavoriService {

    constructor(
        @InjectRepository(Favori)
        private readonly favoriRepo: Repository<Favori>,
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        @InjectRepository(Pays)
        private readonly paysRepo: Repository<Pays>,
    ) { }

    async addFavori(userId: string, paysId: string) {
        const user = await this.userRepo.findOne({ where: { id: userId } });
        const pays = await this.paysRepo.findOne({ where: { id: paysId } });

        if (!user || !pays) throw new Error('Utilisateur ou pays introuvable');

        const exist = await this.favoriRepo.findOne({ where: { user: { id: userId }, pays: { id: paysId } } });

        if (exist) throw new NotFoundException('Ce pays est déjà dans les favoris');

        const favori = this.favoriRepo.create({ user, pays });
        const fav = await this.favoriRepo.save(favori);
        return {
            id: fav.id,
            user: {
                id: user.id,
                nom: user.nom,
            },
            pays: {
                id: pays.id,
                nom: pays.nom,
            },
        };
    }

    async removeFavori(userId: string, paysId: string) {
        return this.favoriRepo.delete({ user: { id: userId }, pays: { id: paysId } });
    }

    async findByUser(userId: string) {
        const fav = await this.favoriRepo.find({
            where: { user: { id: userId } },
            relations: ['pays'],
        });
        return fav.map(f => ({
            id: f.id,
            user: {
                nom: f.user.nom,
            },
            pays: {
                id: f.pays.id,
                nom: f.pays.nom,
            },

        }));
    }
}


