import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorService } from './actor.service';
import { ActorController } from './actor.controller';
import { Actor } from 'src/entities/actor.entity';
import { MovieActor } from 'src/entities/movie_actor.entity';
import { MovieActorModule } from 'src/movie_actor/movie_actor.module';
import { MovieAward } from 'src/entities/movie_award.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Actor, MovieActor, MovieAward]), MovieActorModule],
  controllers: [ActorController],
  providers: [ActorService],
  exports: [TypeOrmModule.forFeature([Actor])],
})
export class ActorModule {}
