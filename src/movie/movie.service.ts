import { Injectable } from '@nestjs/common';
import { Movie } from 'src/Entites/movie.entity';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dtos/createMovieDto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from './dtos/PaginationDto';
import { MovieResponseDto } from '../movie/dtos/MovieResponseDto';
import { ActorResponseDto } from '../actor/dtos/ActorResponseDto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepo: Repository<Movie>,
  ) {}

  async createMovie(dto: CreateMovieDto): Promise<Movie> {
    const movie = this.movieRepo.create(dto);
    return await this.movieRepo.save(movie);
  }

  async getMovieByUuid(uuid: string): Promise<MovieResponseDto> {
    const movie = await this.movieRepo.findOne({
      where: { uuid },
      relations: [
        'movieActorActors',
        'director',
        'movieActorActors.actor',
        'genres',
      ],
    });

    if (!movie) {
      throw new Error('Movie not found');
    }

    const responseDto = new MovieResponseDto();
    responseDto.title = movie.title;
    responseDto.uuid = movie.uuid;
    responseDto.releaseDate = movie.releaseDate;
    responseDto.genre = movie.genres.map((genre) => genre.name).join(', '); // Adjust if genre is a relation
    responseDto.averageRatings = movie.averageRatings;
    responseDto.overview = movie.overview;
    responseDto.poster = movie.poster;
    responseDto.trailer = movie.trailer;
    responseDto.actors = movie.movieActorActors.map((movieActor) => {
      const actorDto = new ActorResponseDto();
      actorDto.uuid = movieActor.actor.uuid;
      actorDto.firstName = movieActor.actor.firstName;
      actorDto.lastName = movieActor.actor.lastName;
      actorDto.poster = movieActor.actor.picture;
      actorDto.birthDate = movieActor.actor.birthDate;
      actorDto.bio = movieActor.actor.bio;
      actorDto.character = movieActor.character;
      return actorDto;
    });

    return responseDto;
  }

  async pagination(
    paginationDto: PaginationDto,
  ): Promise<{ data: Movie[]; total: number }> {
    const { page, limit, search, sortOrder, sortField, Genre } = paginationDto;

    const queryBuilder = this.movieRepo.createQueryBuilder('movie');

    if (search) {
      queryBuilder.where('movie.title LIKE :search', { search: `%${search}%` });
    }

    if (sortField) {
      const order = (sortOrder?.toUpperCase() as 'ASC' | 'DESC') || 'ASC';
      queryBuilder.orderBy(`movie.${sortField}`, order);
    }

    if (Genre) {
      queryBuilder.where('movie.genre = :Genre', { Genre: Genre });
    }

    const [data, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();
    return { data, total };
  }
}
