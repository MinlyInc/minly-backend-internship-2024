import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/entities/movie.entity';
import { Like, Repository } from 'typeorm';
import {pagination_page,pagination_limit} from '../const/const'

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async findAll(): Promise<Movie[]> {
    try {
      return await this.movieRepository.find();
    } catch (error) {
      throw new HttpException(`Failed to retrieve movies, ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async searchMovies(title?: string): Promise<Movie[]> {
    try {
      const searchCriteria: any = {};
      if (title) {
        searchCriteria.title = Like(`%${title}%`);
      }
      return await this.movieRepository.find({ where: searchCriteria });
    } catch (error) {
      throw new HttpException(`Failed to search movies, ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getPaginatedMovies(
    sortBy: 'releaseDate' | 'rating',
    page = pagination_page,
    limit = pagination_limit,
  ): Promise<{ data: Movie[]; count: number }> {
    try {
      const order: any = {};
      if (sortBy === 'releaseDate') {
        order.releaseDate = 'DESC';
      } else if (sortBy === 'rating') {
        order.rating = 'DESC';
      }

      const [result, total] = await this.movieRepository.findAndCount({
        order,
        skip: (page - 1) * limit,
        take: limit,
      });

      return { data: result, count: total };
    } catch (error) {
      throw new HttpException(`Failed to retrieve paginated movies, ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getMovieByUuid(uuId: string): Promise<Movie> {
    try {
      const movie = await this.movieRepository.findOne({
        where: { uuId },
        relations: ['actor', 'movieActorActors', 'movieActorActors.actor', 'awards'],
      });
      if (!movie) {
        throw new NotFoundException(`Movie with UUID ${uuId} not found`);
      }
      return movie;
    } catch (error) {
      throw new HttpException(`Failed to retrieve movie, ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getMoviesByGenre(genre: string): Promise<Movie[]> {
    try {
      return await this.movieRepository.find({ where: { genre } });
    } catch (error) {
      throw new HttpException(`Failed to retrieve movies by genre, ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
