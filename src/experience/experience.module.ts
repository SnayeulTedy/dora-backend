import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperienceService } from './experience.service';
import { ExperienceController } from './experience.controller';
import { Pays } from 'src/pays/pays.entity';
import { User } from 'src/users/user.entity';
import { Experience } from './experience.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Experience, User, Pays])],
  controllers: [ExperienceController],
  providers: [ExperienceService],
})
export class ExperienceModule {}
