import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  create(createMovieDto: CreateMovieDto) {
    const movie = this.movieRepository.create(createMovieDto);
    return this.movieRepository.save(movie);
  }

  
  findAll() {
    return this.movieRepository.find();
  }
  
  findOne(id: number) {
    return this.movieRepository.findOneBy({ id });
  }

async search(searchTerm: string) {
    return this.movieRepository.createQueryBuilder('movie')
      .where('movie.title ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
      .orWhere('CAST(movie.img AS TEXT) ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` }) // Convert JSONB to text for search
      .getMany();
}

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    await this.movieRepository.update(id, updateMovieDto);
    return this.movieRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const movie = await this.movieRepository.findOneBy({ id });
    if (movie) {
      await this.movieRepository.remove(movie);
    }
    return movie;
  }
}
