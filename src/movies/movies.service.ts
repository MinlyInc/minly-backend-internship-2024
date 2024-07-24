import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/entities/movie.entity';
import { Like, Repository } from 'typeorm';
import { CreateMovieDto } from './dtos/createMovieDto';

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(Movie)
        private movieRepository: Repository<Movie>,
      ) {}
      async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
        return await this.movieRepository.save(createMovieDto);
    }
    async findAll() : Promise<Movie[]> {
        return  this.movieRepository.find({

        });
    }

    async searchMovies(title?: string): Promise<Movie[]> {
        const searchCriteria: any = {};
    
        if (title) {
          searchCriteria.title = Like(`%${title}%`);
        }
        return await this.movieRepository.find({ where: searchCriteria });
      }

      async getPaginatedMovies(
        sortBy: 'releaseDate' | 'rating',
        page: number=1,
        limit: number=8,
      ): Promise<{ data: Movie[]; count: number }> {
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
      }

      async getMovieByUuid(uuId: string): Promise<Movie> {
        const movie = await this.movieRepository.findOne({ where: { uuId } , relations:['actor','movieActorActors','movieActorActors.actor']});
        if (!movie) {
          throw new NotFoundException(`Movie with UUID ${uuId} not found`);
        }
        return movie;
      }

      async getMoviesByGenre(genre: string): Promise<Movie[]> {
        return this.movieRepository.find({ where: { genre } });
    }
    }
