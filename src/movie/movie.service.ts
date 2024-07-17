import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from 'src/entities/movie.entity';
import { Director } from 'src/entities/director.entity';
import { format } from 'date-fns';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Director)
    private readonly directorRepository: Repository<Director>,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    const director = await this.directorRepository.findOne({ where: { id: createMovieDto.directorId } });
    const movie = this.movieRepository.create({ ...createMovieDto, director });
    return this.movieRepository.save(movie);
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
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

      const formattedResult = result.map(movie => ({
        ...movie,
        release_date: format(new Date(movie.release_date), 'yyyy')
      }));

      return {
        data: formattedResult,
        total,
        page,
        lastPage: Math.ceil(total / limit),
      };
    }

  findOne(id: number) {
    return this.movieRepository.findOne({ where: { id }, relations: ['director'] });
  }

  async search(searchTerm: string) {
    const result = await this.movieRepository.createQueryBuilder('movie')
      .leftJoinAndSelect('movie.director', 'director')
      .where('movie.title ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
      .getMany();
  
    const formattedResult = result.map(movie => ({
      ...movie,
      release_date: format(new Date(movie.release_date), 'yyyy')
    }));
  
    return formattedResult;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const director = await this.directorRepository.findOne({ where: { id: updateMovieDto.directorId } });
    await this.movieRepository.update(id, { ...updateMovieDto, director });
    return this.movieRepository.findOne({ where: { id }, relations: ['director'] });
  }

  async remove(id: number) {
    const movie = await this.movieRepository.findOne({ where: { id }, relations: ['director'] });
    if (movie) {
      await this.movieRepository.remove(movie);
    }
    return movie;
  }
}
