import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntryInfoController } from './entry-info.controller';
import { EntryInfo } from './entry-info.entity';
import { EntryInfoService } from './entry-info.service';

@Module({
  imports: [TypeOrmModule.forFeature([EntryInfo])],
  providers: [EntryInfoService],
  controllers: [EntryInfoController],
  exports: [EntryInfoService],
})
export class EntryInfoModule {}
