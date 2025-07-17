import { Module } from '@nestjs/common';
import { PaysService } from './pays.service';
import { Pays } from './pays.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaysController } from './pays.controller';
import { ApiCountriesService } from './ApiCountries.service';
import { VisaApiService } from 'src/fiche-pays/entry-info/visa-api.service';
import { EntryInfo } from 'src/fiche-pays/entry-info/entry-info.entity';
import { EntryInfoModule } from 'src/fiche-pays/entry-info/entry-info.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pays, EntryInfo]),
    EntryInfoModule
],
  providers: [PaysService, ApiCountriesService, VisaApiService, ],
  controllers: [PaysController],
  exports: [PaysService, ApiCountriesService, VisaApiService],
})
export class PaysModule {}
