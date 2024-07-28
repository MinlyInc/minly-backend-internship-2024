import { Module } from '@nestjs/common';
import { MovieActorService } from './movie-actor.service';
import { MovieActorController } from './movie-actor.controller';
import { MovieActorAward } from 'src/Entites/movie-actor-award.entity';
import { Movie } from 'src/Entites/movie.entity';
import { Actor } from 'src/Entites/actor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { actorMoviesMovie } from 'src/Entites/movie-actor-actor.entity';
import { Award } from 'src/Entites/award.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovieActorAward, actorMoviesMovie, Award,Actor])
  ],
  providers: [MovieActorService],
  controllers: [MovieActorController]
})
export class MovieActorModule {}
