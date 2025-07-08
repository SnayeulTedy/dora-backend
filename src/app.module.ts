import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './Auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesGuard } from './users/guard/role.guard';
import { APP_GUARD } from '@nestjs/core';
import { PaysModule } from './pays/pays.module';
import { UsersController } from './users/users.controller';
import { JwtAuthGuard } from './users/guard/jwt-auth.guard';
import { AuthController } from './Auth/auth.controller';

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

  ],
  controllers: [AppController, UsersController, AuthController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,  
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,  
    // },
  ],
})
export class AppModule { }
