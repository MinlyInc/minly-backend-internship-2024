import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { MoviesModule } from './movies/movies.module';
import { ActorsModule } from './actors/actors.module';
import { DirectorsModule } from './directors/directors.module';
import { FestivalModule } from './festival/festival.module';
import typeorm from './config/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
    HealthModule,
    MoviesModule,
    ActorsModule,
    DirectorsModule,
    FestivalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
