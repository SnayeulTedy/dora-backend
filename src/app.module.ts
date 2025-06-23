import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { AuthModule } from './Auth/auth.module';
import { UsersService } from './users/users.service';
import { AuthService } from './Auth/auth.service';
import { AuthController } from './Auth/auth.controller';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    UsersModule,
    // AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'dora_db',
      entities: [User],
      synchronize: true,
    }),
    
  ],
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule {}
