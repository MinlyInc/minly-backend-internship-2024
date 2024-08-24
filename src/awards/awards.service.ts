// awards.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Awards } from '../entities/award.entity';
import { Actor } from '../entities/actor.entity';
import { Movie } from '../entities/movie.entity';

@Injectable()
export class AwardsService {
  constructor(
    @InjectRepository(Awards)
    private awardsRepository: Repository<Awards>,
    @InjectRepository(Actor)
    private actorsRepository: Repository<Actor>,
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  async createAwardWithRelations(
    name: string,
    actorIds: number[],
    movieIds: number[],
  ): Promise<Awards> {
    const award = new Awards();
    award.name = name;

    if (actorIds && actorIds.length > 0) {
      award.actors = await this.actorsRepository.findByIds(actorIds);
    }

    if (movieIds && movieIds.length > 0) {
      award.movies = await this.moviesRepository.findByIds(movieIds);
    }

    return this.awardsRepository.save(award);
  }

  async findAll(): Promise<Awards[]> {
    return this.awardsRepository.find({ relations: ['actors', 'movies'] });
  }
}
