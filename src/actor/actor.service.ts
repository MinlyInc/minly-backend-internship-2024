import { Injectable } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actor } from 'src/entities/actor.entity';
import { MovieActor } from 'src/entities/movie_actor.entity';
import { MovieAward } from 'src/entities/movie_award.entity';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
    @InjectRepository(MovieActor)
    private readonly movieActorRepository: Repository<MovieActor>,
    @InjectRepository(MovieAward)
    private readonly movieAwardRepository: Repository<MovieAward>,
  ) {}

  create(createActorDto: CreateActorDto) {
    const actor = this.actorRepository.create(createActorDto);
    return this.actorRepository.save(actor);
  }

  findAll() {
    return this.actorRepository.find({});
  }

  async findOne(uuid: string) {
    const actor = await this.actorRepository.findOne({ where: { uuid }, relations: ['movieActor', 'movieActor.movie', 'movieActor.awards'] });
    
    const movies = actor.movieActor.map(ma => ({
      id: ma.movie.id,
      title: ma.movie.title,
      characterName: ma.characterName,
    }));

    const awards = actor.movieActor.flatMap(ma => ma.awards.map(award => ({
      id: award.id,
      year: award.year,
      award: award.awardName,
      category: award.category,
      movieId: ma.movie.id,
      movieTitle: ma.movie.title,
    })));

    return { ...actor, movies, awards };
  }

  update(id: number, updateActorDto: UpdateActorDto) {
    return this.actorRepository.update(id, updateActorDto);
  }

  remove(id: number) {
    return this.actorRepository.delete(id);
  }
}
