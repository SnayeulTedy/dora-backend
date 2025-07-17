import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pays } from './pays.entity';
import { ApiCountriesService } from './ApiCountries.service';
import { EntryInfo } from 'src/fiche-pays/entry-info/entry-info.entity';
import { VisaApiService } from 'src/fiche-pays/entry-info/visa-api.service';

@Injectable()
export class PaysService {
    constructor(
        @InjectRepository(Pays)
        private readonly paysRepository: Repository<Pays>,
        @InjectRepository(EntryInfo)
        private readonly entryInfoRepository: Repository<EntryInfo>,
        private readonly apiCountriesService: ApiCountriesService,
        private readonly visaApiService: VisaApiService,

    ) { }

    async importCountries() {
        const countries = await this.apiCountriesService.fetchAllCountries() as Array<{
            cca2: string;
            name: { common: string };
            region: string;
            currencies?: { [key: string]: any };
            languages?: { [key: string]: string };
            timezones?: string[];
            flags?: { png?: string };
        }>;

        const paysEntities = countries.map((country) => this.paysRepository.create({
            code_iso: country.cca2,
            nom: country.name.common,
            continent: country.region,
            devise: Object.keys(country.currencies || {})[0] || '',
            langue_officielle: Object.values(country.languages || {}) as string[],
            fuseau_horaire: country.timezones ? country.timezones[0] : '',
            url_drapeau: country.flags?.png || '',
        }));

        await this.paysRepository.save(paysEntities);

        return { message: 'Import terminé', total: paysEntities.length };
    }


    async findAll(): Promise<Pays[]> {
        return this.paysRepository.find({
            relations: [
                'entryInfos',
                'coutDeVie',
                'culture',
                'education',
                'logements',
                'marcheTravail',
                'sante',
            ],
        });
    }

    async findOneByName(nom: string): Promise<Pays | null> {
        return this.paysRepository.findOne({
            where: { nom },
            relations: [
                'entryInfos',
                'coutDeVie',
                'culture',
                'education',
                'logements',
                'marcheTravail',
                'sante',
            ],
        });
    }

    async findByContinent(continent: string): Promise<Pays[]> {
        return this.paysRepository.find({
            where: { continent },
            relations: [
                'entryInfos',
                'coutDeVie',
                'culture',
                'education',
                'logements',
                'marcheTravail',
                'sante',
            ],
        });
    }

    async findByLangue(langue: string): Promise<Pays[]> {
        return this.paysRepository.createQueryBuilder('pays')
            .where('langue_officielle @> :langue', { langue: [langue] })
            .leftJoinAndSelect('pays.entryInfos', 'entryInfos')
            .leftJoinAndSelect('pays.coutDeVie', 'coutDeVie')
            .leftJoinAndSelect('pays.culture', 'culture')
            .leftJoinAndSelect('pays.education', 'education')
            .leftJoinAndSelect('pays.logements', 'logements')
            .leftJoinAndSelect('pays.marcheTravail', 'marcheTravail')
            .leftJoinAndSelect('pays.sante', 'sante')
            .getMany();
    }

    async updateVisaInfo(paysId: string) {
        const pays = await this.paysRepository.findOne({
            where: { id: paysId }
        });
        if (!pays) throw new Error('Pays non trouvé');

        const apiData = await this.visaApiService.fetchVisaInfo(pays.nom);
        if (!apiData || !apiData.visa) throw new Error('Données API manquantes');

        const entryInfo = new EntryInfo();
        entryInfo.pays = pays;
        entryInfo.visa_requis = apiData.visa.requirement.includes('Visa required');
        entryInfo.types_visa = ['Etudiant','Tourist', 'Business'];
        entryInfo.conditions_entree = apiData.visa.text;
        entryInfo.exigences_sanitaires = apiData.vaccinations?.vaccines ?? [];
        entryInfo.duree_sejour_autorisee = 'Variable';
        entryInfo.date_mise_a_jour = new Date();

        return this.entryInfoRepository.save(entryInfo);
    }

    async getEntryInfos(paysId: string) {
        const pays = await this.paysRepository.findOne({
            where: { id: paysId },
            relations: ['entryInfos'],
        });

        if (!pays) {
            throw new Error('Pays non trouvé');
        }

        return pays.entryInfos;
    }


    async refreshAllVisaInfo() {
        const allPays = await this.paysRepository.find();

        for (const pays of allPays) {
            try {
                await this.updateVisaInfo(pays.id);
            } catch (e) {
                console.warn(`Erreur pour ${pays.nom} :`, e.message);
            }
        }
    }


}
