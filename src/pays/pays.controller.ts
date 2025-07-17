import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { Pays } from './pays.entity';
import { PaysService } from './pays.service';

@Controller('pays')
export class PaysController {
    constructor(private readonly paysService: PaysService) { }
    @Get()
    async findAll(): Promise<Pays[]> {
        return this.paysService.findAll();
    }

    @Get('import')
    async importCountries() {
        return this.paysService.importCountries();
    }

    @Get('nom/:nom')
    async findOneByName(@Param('nom') nom: string): Promise<Pays> {
        const pays = await this.paysService.findOneByName(nom);
        if (!pays) {
            throw new NotFoundException(`country with name ${nom} not found`);
        }
        return pays;
    }

    @Get('continent/:continent')
    async findByContinent(@Param('continent') continent: string): Promise<Pays[]> {
        const pays = await this.paysService.findByContinent(continent);
        if (!Array.isArray(pays) || pays.length === 0) {
            throw new NotFoundException(`No countries found for continent ${continent}`);
        }
        return pays;
    }

    @Get('langue/:langue')
    async findByLangue(@Param('langue') langue: string): Promise<Pays[]> {
        const pays = await this.paysService.findByLangue(langue);
        if (!Array.isArray(pays) || pays.length === 0) {
            throw new NotFoundException(`No countries found for language ${langue}`);
        }
        return pays;
    }

    @Get('entry-infos/:id')
    async getEntryInfos(@Param('id') id: string) {
        return this.paysService.getEntryInfos(id);
    }


    @Get('visa/refresh/:id')
    async refreshVisa(@Param('id') id: string) {
        return this.paysService.updateVisaInfo(id);
    }

}