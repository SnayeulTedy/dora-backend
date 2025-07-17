import { Controller, Post, UploadedFile, UseInterceptors, Body, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ExperienceService } from './experience.service';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { CreateExperienceDto } from './dto/create-experience.dto';

@Controller('experiences')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Post('add')
  @UseInterceptors(FileInterceptor('media', {
    storage: diskStorage({
      destination: './uploads/experiences',
      filename: (req, file, callback) => {
        const filename = uuidv4() + extname(file.originalname);
        callback(null, filename);
      },
    }),
  }))
  async createExperience(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: CreateExperienceDto,
  ) {
    const url_media = file ? `/uploads/experiences/${file.filename}` : undefined;
    return this.experienceService.create({ ...data, url_media });
  }

  @Post('update/:id')
  @UseInterceptors(FileInterceptor('media', {
    storage: diskStorage({
      destination: './uploads/experiences',
      filename: (req, file, callback) => {
        const filename = uuidv4() + extname(file.originalname);
        callback(null, filename);
      },
    }),
  }))
  async updateExperience(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: CreateExperienceDto,
  ) {
    const url_media = file ? `/uploads/experiences/${file.filename}` : undefined;
    return this.experienceService.update(data.id, { ...data, url_media });
  }

  @Post('delete/:id')
  async deleteExperience(@Body('id') id: string) {
    return this.experienceService.delete(id);
  }

  @Get()
  async findAllExperiences() {
    return this.experienceService.findAll();
  }
}
