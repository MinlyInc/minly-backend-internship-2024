import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { Movie } from 'src/Entites/movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Director } from 'src/Entites/director.entity';
import { Actor } from 'src/Entites/actor.entity';
import { Writer } from 'src/Entites/writer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie,Director, Actor,Writer])],
  controllers: [MovieController],
  providers: [MovieService]
})
export class MovieModule {}
