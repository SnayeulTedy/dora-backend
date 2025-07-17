import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { EntryInfoService } from './entry-info.service';
import { EntryInfo } from './entry-info.entity';

@Controller('entry-info')
export class EntryInfoController {
  constructor(private readonly entryInfoService: EntryInfoService) {}

  @Get()
  async getAll(): Promise<EntryInfo[]> {
    return this.entryInfoService.findAll();
  }

//   @Get(':id')
//   async getOne(@Param('id') id: string): Promise<EntryInfo> {
//     return this.entryInfoService.findById(id);
//   }

  @Post()
  async create(@Body() data: Partial<EntryInfo>): Promise<EntryInfo> {
    return this.entryInfoService.create(data);
  }

//   @Put(':id')
//   async update(@Param('id') id: string, @Body() data: Partial<EntryInfo>): Promise<EntryInfo> {
//     return this.entryInfoService.update(id, data);
//   }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.entryInfoService.delete(id);
  }
}
