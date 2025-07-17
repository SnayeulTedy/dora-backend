import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntryInfo } from './entry-info.entity';

@Injectable()
export class EntryInfoService {
  constructor(
    @InjectRepository(EntryInfo)
    private readonly entryInfoRepository: Repository<EntryInfo>,
  ) { }

  async findAll(): Promise<EntryInfo[]> {
    return this.entryInfoRepository.find({ relations: ['pays'] });
  }

  //   async findById(id: string): Promise<EntryInfo> {
  //     return this.entryInfoRepository.findOne({ where: { id }, relations: ['pays'] });
  //   }

  async create(data: Partial<EntryInfo>): Promise<EntryInfo> {
    const entryInfo = this.entryInfoRepository.create(data);
    return this.entryInfoRepository.save(entryInfo);
  }

  //   async update(id: string, data: Partial<EntryInfo>): Promise<EntryInfo> {
  //     await this.entryInfoRepository.update(id, data);
  //     return this.findById(id);
  //   }

  async delete(id: string): Promise<void> {
    await this.entryInfoRepository.delete(id);
  }
}
