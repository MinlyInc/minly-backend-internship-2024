import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
;
import { MovieActor } from 'src/entities/movie_actor.entity';
import { MovieAward } from 'src/entities/movie_award.entity';
import { MovieAwardController } from 'src/movie_awards/movie_awards.controller';
import { MovieAwardService } from 'src/movie_awards/movie_awards.service';

@Module({
  imports: [TypeOrmModule.forFeature([MovieActor, MovieAward])],
  controllers: [MovieAwardController],
  providers: [MovieAwardService],
  exports: [TypeOrmModule],
})
export class MovieActorModule {}
