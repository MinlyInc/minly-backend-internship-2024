import { Injectable } from '@nestjs/common';
import { Movie } from 'src/Entites/movie.entity';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dtos/createMovieDto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from './dtos/PaginationDto';
import { Director } from 'src/Entites/director.entity';

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

  async getMovieByUuid(uuid: string): Promise<Movie> {
    return await this.movieRepo.findOne({
      where: { uuid },
      relations: [
        'movieActorActors',
        'director',
        'movieActorActors.actor',
        'genres',
      ],
    });
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
