import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { Movie } from 'src/entities/movie.entity';
import { Director } from 'src/entities/director.entity';
import { Actor } from 'src/entities/actor.entity'; 
import { ActorModule } from '../actor/actor.module'; 

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Director, Actor]), ActorModule], 
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
