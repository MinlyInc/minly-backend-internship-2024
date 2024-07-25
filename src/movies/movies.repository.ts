import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/entities/movie.entity';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dtos/body/create-movie.dto';
import { Director } from 'src/entities/director.entity';

@Injectable()
export class MoviesRepository {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    @InjectRepository(Director)
    private directorRepository: Repository<Director>,
  ) {}

  public async createMovie(movieData: CreateMovieDto): Promise<Movie> {
      const director = await this.directorRepository.findOne({ where: { id: movieData.director_id } });
      if (!director) {
        throw new Error('Director not found');
      }
      
      const movie = this.movieRepository.create({
        ...movieData,
        director: director,
      });
      
      return await this.movieRepository.save(movie);
  }

  public async getMoviesByLimitAndOffesetAndFilterBy(
    limit: number,
    offset: number,
    sortBy: string | undefined,
    sortOrder: 'ASC' | 'DESC',
    filterValue?: string
  ): Promise<{ movies: Partial<Movie[]>; totalCount: number }> {
  
    const queryBuilder = this.movieRepository.createQueryBuilder('movie')
    .select([
        'movie.poster',
        'movie.uuid',
        'movie.average_rating',
        "movie.release_date",
        "movie.title"
    ])
    .take(limit)
    .skip(offset);
  
    if (sortBy !== undefined) {
      queryBuilder.orderBy(`movie.${sortBy}`, sortOrder);
    }
  
    if (filterValue !== undefined) {
      queryBuilder.andWhere("(LOWER(movie.title) = LOWER(:filterValue))", { filterValue });
    }


    const [movies, totalCount] = await Promise.all([
      queryBuilder.getMany(),
      this.movieRepository.createQueryBuilder('movie')
        .getCount()
    ]);
  
    return { movies, totalCount };
  }



  public async getMovieDetails(movieUUID : string){
    const data = await this.movieRepository.createQueryBuilder('movie')
    .leftJoinAndSelect('movie.director', 'director')
    .leftJoinAndSelect('movie.movieActors', 'movieActor')
    .leftJoinAndSelect('movieActor.actor', 'actor')
    .leftJoinAndSelect('movie.categories', 'category')
    .leftJoinAndSelect('movie.language' , 'language')
    .leftJoinAndSelect('movie.writers' , 'writer')
    .select([
      'movie.title',
      'movie.release_date',
      'movie.poster',
      'movie.average_rating',
      'movie.trailer',
      'movie.uuid',
      'movie.overview',
      'director.first_name',
      'director.last_name',
      'director.uuid',
      'actor.first_name',
      'actor.last_name',
      'actor.uuid',
      'category.name',
      'language.name',
      'movieActor.character',
      'writer.first_name',
      'writer.last_name',
    ])
    .where('movie.uuid = :uuid', { uuid: movieUUID })
    .getOne();

      return data;

  }
  
}
