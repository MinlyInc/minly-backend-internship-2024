import { Module } from '@nestjs/common';
import { MovieAwardService } from './movie_awards.service';
import { MovieAwardController } from './movie_awards.controller';
import typeorm from 'src/config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieAward } from 'src/entities/movie_award.entity';
import { MovieActor } from 'src/entities/movie_actor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovieAward,MovieActor])],
  controllers: [MovieAwardController],
  providers: [MovieAwardService],
})
export class MovieAwardsModule {}
