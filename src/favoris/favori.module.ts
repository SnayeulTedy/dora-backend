import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriService } from './favori.service';
import { FavoriController } from './favori.controller';
import { Pays } from 'src/pays/pays.entity';
import { User } from 'src/users/user.entity';
import { Favori } from './favori.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favori, User, Pays])],
  providers: [FavoriService],
  controllers: [FavoriController],
  exports: [FavoriService, TypeOrmModule],
})
export class FavoriModule {}
