import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './Auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersController } from './users/users.controller';
import { AuthController } from './Auth/auth.controller';
import { PaysController } from './pays/pays.controller';
import { PaysModule } from './pays/pays.module';
import { EntryInfoModule } from './fiche-pays/entry-info/entry-info.module';
// import { CoutDeVieModule } from './fiche-pays/cout-de-vie/cout-de-vie.module';
// import { LogementModule } from './fiche-pays/logement/logement.module';
// import { SanteModule } from './fiche-pays/sante/sante.module';
// import { EducationModule } from './fiche-pays/education/education.module';
// import { MarcheDuTravailModule } from './fiche-pays/marche-du-travail/marche-du-travail.module';
// import { CultureModule } from './fiche-pays/culture/culture.module';
import { ExperienceModule } from './experience/experience.module';
import { DossierModule } from './dossier/dossier.module';
import { FavoriModule } from './favoris/favori.module';
import { FavoriController } from './favoris/favori.controller';
import { FavoriService } from './favoris/favori.service';
import { ForumModule } from './forum/forum.module';
import { ForumService } from './forum/forum.service';
import { PostsModule } from './forum/posts/posts.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PaysModule,
    ConfigModule.forRoot({
      isGlobal: true, envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        ssl: true,
        extra: {
          ssl: { rejectUnauthorized: false },
        },
        synchronize: true,
      }),
    }),
    EntryInfoModule,
    ExperienceModule,
    DossierModule,
    FavoriModule,
    ForumModule,
    PostsModule,
    // CoutDeVieModule,
    // LogementModule,
    // SanteModule,
    // EducationModule,
    // MarcheDuTravailModule,
    // CultureModule,

  ],
  controllers: [AppController, UsersController, AuthController, PaysController, FavoriController],
  providers: [
    AppService,
    FavoriService,
    ForumService,
    
  ],
})
export class AppModule { }
