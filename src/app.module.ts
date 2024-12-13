import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { MovieModule } from './movie/movie.module';
import { DirectorModule } from './director/director.module';
import { ActorModule } from './actor/actor.module';
import { MovieActorModule } from './movie_actor/movie_actor.module';
import { MovieAwardsModule } from './movie_awards/movie_awards.module';
import typeorm from './config/typeorm';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [typeorm] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
    HealthModule,
    MovieModule,
    DirectorModule,
    ActorModule,
    MovieActorModule,
    MovieAwardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
