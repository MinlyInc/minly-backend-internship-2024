import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from 'src/entities/movie.entity';
import { Director } from 'src/entities/director.entity';
import { format } from 'date-fns';
import { Actor } from 'src/entities/actor.entity';
import { MovieActor } from 'src/entities/movie_actor.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Director)
    private readonly directorRepository: Repository<Director>,
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
    @InjectRepository(MovieActor)
    private readonly movieActorRepository: Repository<MovieActor>,
  ) {}

  private transformYouTubeUrl(url: string): string {
    const urlParams = new URLSearchParams(new URL(url).search);
    return `https://www.youtube.com/embed/${urlParams.get('v')}`;
  }

  async create(createMovieDto: CreateMovieDto) {
    const director = await this.directorRepository.findOne({ where: { uuid: createMovieDto.directorId } });
    const writer = await this.directorRepository.findOne({ where: { uuid: createMovieDto.writerId } });

    if (!director) {
      throw new Error('Director not found');
    }

    if (createMovieDto.writerId && !writer) {
      throw new Error('Writer not found');
    }

    const actorPromises = createMovieDto.actors.map(actorDto =>
      this.actorRepository.findOne({ where: { uuid: actorDto.uuid } })
    );
    const actors = await Promise.all(actorPromises);

    if (actors.includes(undefined)) {
      throw new Error('One or more actors not found');
    }

    const movie = this.movieRepository.create({
      ...createMovieDto,
      director,
      writer,
      trailer: this.transformYouTubeUrl(createMovieDto.trailer),
    });

    const savedMovie = await this.movieRepository.save(movie);

    const movieActorPromises = createMovieDto.actors.map(actorDto => {
      const actor = actors.find(a => a.uuid === actorDto.uuid);
      const movieActor = this.movieActorRepository.create({
        movie: savedMovie,
        actor: actor,
        characterName: actorDto.characterName,
      }); 
      return this.movieActorRepository.save(movieActor);
    });

    await Promise.all(movieActorPromises);

    return savedMovie;
  }

  async findAll(sort?: string, order?: string, page: number = 1, limit: number = 8) {
    const queryBuilder = this.movieRepository.createQueryBuilder('movie');

    if (sort) {
      const validSortFields = ['average_rating', 'release_date'];
      if (validSortFields.includes(sort)) {
        queryBuilder.orderBy(`movie.${sort}`, order === 'desc' ? 'DESC' : 'ASC');
      }
    }

    const [result, total] = await queryBuilder
      .leftJoinAndSelect('movie.director', 'director')
      .leftJoinAndSelect('movie.movieActor', 'movieActor')
      .leftJoinAndSelect('movieActor.actor', 'actor')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    const formattedResult = result.map(movie => ({
      ...movie,
      release_date: format(new Date(movie.release_date), 'yyyy'),
    }));

    return {
      data: formattedResult,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    const movie = await this.movieRepository.findOne({ where: { id }, relations: ['director', 'movieActor', 'movieActor.actor', 'writer', 'genres'] });
    if (!movie) {
      throw new Error('Movie not found');
    }
    return {
      ...movie,
      release_date: format(new Date(movie.release_date), 'yyyy'),
      actors: movie.movieActor.map(movieActor => ({
        first_name: movieActor.actor.first_name,
        last_name: movieActor.actor.last_name,
        picture: movieActor.actor.picture,
        characterName: movieActor.characterName,
      })),
    };
  }

  async search(searchTerm: string) {
    const result = await this.movieRepository.createQueryBuilder('movie')
      .leftJoinAndSelect('movie.director', 'director')
      .leftJoinAndSelect('movie.movieActor', 'movieActor')
      .leftJoinAndSelect('movieActor.actor', 'actor')
      .leftJoinAndSelect('movie.writer', 'writer')
      .where('movie.title ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
      .getMany();

    const formattedResult = result.map(movie => ({
      ...movie,
      release_date: format(new Date(movie.release_date), 'yyyy'),
    }));

    return formattedResult;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const director = await this.directorRepository.findOne({ where: { uuid: updateMovieDto.directorId } });
    const writer = await this.directorRepository.findOne({ where: { uuid: updateMovieDto.writerId } });

    if (!director) {
      throw new Error('Director not found');
    }

    if (updateMovieDto.writerId && !writer) {
      throw new Error('Writer not found');
    }

    const actorPromises = updateMovieDto.actors.map(actorDto =>
      this.actorRepository.findOne({ where: { uuid: actorDto.uuid } })
    );
    const actors = await Promise.all(actorPromises);

    if (actors.includes(undefined)) {
      throw new Error('One or more actors not found');
    }

    await this.movieRepository.update(id, { ...updateMovieDto, director, writer });

    const movie = await this.movieRepository.findOne({ where: { id }, relations: ['movieActor'] });

    if (!movie) {
      throw new Error('Movie not found');
    }

    await this.movieActorRepository.delete({ movie });

    const movieActorPromises = updateMovieDto.actors.map(actorDto => {
      const actor = actors.find(a => a.uuid === actorDto.uuid);
      const movieActor = this.movieActorRepository.create({
        movie,
        actor,
        characterName: actorDto.characterName,
      });
      return this.movieActorRepository.save(movieActor);
    });

    await Promise.all(movieActorPromises);

    return this.movieRepository.findOne({ where: { id }, relations: ['director', 'movieActor', 'movieActor.actor', 'writer'] });
  }

  async remove(id: number) {
    const movie = await this.movieRepository.findOne({ where: { id }, relations: ['director', 'movieActor', 'movieActor.actor', 'writer'] });
    if (movie) {
      await this.movieRepository.remove(movie);
    }
    return movie;
  }
}
