import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { Movie } from 'src/entities/movie.entity';
import { Director } from 'src/entities/director.entity';
import { Actor } from 'src/entities/actor.entity'; 
import { ActorModule } from '../actor/actor.module'; 
import { MovieActor } from 'src/entities/movie_actor.entity';
import { MovieAward } from 'src/entities/movie_award.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Director, Actor, MovieActor]), ActorModule, MovieAward], 
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
