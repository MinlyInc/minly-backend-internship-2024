import { Injectable } from '@nestjs/common';
import { CreateMovieAwardDto } from './dto/create-movie_award.dto';
import { UpdateMovieAwardDto } from './dto/update-movie_award.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieAward } from 'src/entities/movie_award.entity';
import { MovieActor } from 'src/entities/movie_actor.entity';

@Injectable()
export class MovieAwardService {
  constructor(
    @InjectRepository(MovieAward)
    private readonly movieAwardRepository: Repository<MovieAward>,
    @InjectRepository(MovieActor)
    private readonly movieActorRepository: Repository<MovieActor>,
  ) {}

  async create(createMovieAwardDto: CreateMovieAwardDto) {
    // TODO @Eweida create a new repository function findByActorUids and use it here
    const movieActors = await this.movieActorRepository.findByIds(createMovieAwardDto.movieActorIds);
    const movieAward = this.movieAwardRepository.create({
      ...createMovieAwardDto,
      movieActors,
    });

    return this.movieAwardRepository.save(movieAward);
  }

  findAll() {
    return this.movieAwardRepository.find({ relations: ['movieActors'] });
  }

  findOne(id: number) {
    return this.movieAwardRepository.findOne({ where: { id }, relations: ['movieActors'] });
  }
  

  async update(id: number, updateMovieAwardDto: UpdateMovieAwardDto) {
    const movieAward = await this.movieAwardRepository.findOne({where: {id}});
    if (!movieAward) {
      throw new Error('Movie Award not found');
    }

    if (updateMovieAwardDto.movieActorIds) {
      const movieActors = await this.movieActorRepository.findByIds(updateMovieAwardDto.movieActorIds);
      movieAward.movieActors = movieActors;
    }

    Object.assign(movieAward, updateMovieAwardDto);
    return this.movieAwardRepository.save(movieAward);
  }

  remove(id: number) {
    return this.movieAwardRepository.delete(id);
  }
}
