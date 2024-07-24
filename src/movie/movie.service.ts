import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from 'src/entities/movie.entity';
import { Director } from 'src/entities/director.entity';
import { format } from 'date-fns';
import { Actor } from 'src/entities/actor.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Director)
    private readonly directorRepository: Repository<Director>,
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
  ) {}

  private transformYouTubeUrl(url: string): string {
    const urlParams = new URLSearchParams(new URL(url).search);
    return `https://www.youtube.com/embed/${urlParams.get('v')}`;
  }

  async create(createMovieDto: CreateMovieDto) {
    const director = await this.directorRepository.findOne({ where: { uuid: createMovieDto.directorId } });
    const writer = await this.directorRepository.findOne({ where: { uuid: createMovieDto.writerId } });

    const actorPromises = createMovieDto.actorIds.map(actorUuid => 
      this.actorRepository.findOne({ where: { uuid: actorUuid } })
    );
    const actors = await Promise.all(actorPromises);
    
    if (!actors || actors.length !== createMovieDto.actorIds.length) {
      throw new Error('One or more actors not found');
    }

    const movie = this.movieRepository.create({ 
      ...createMovieDto, 
      director,
      writer,
      actors,
      trailer: this.transformYouTubeUrl(createMovieDto.trailer),
    });
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
      .leftJoinAndSelect('movie.actors','actors')
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

    async findOne(id: number) {
      const movie = await this.movieRepository.findOne({ where: { id }, relations: ['director', 'actors', 'writer'] });
      if (!movie) {
        throw new Error('Movie not found');
      }
      return {
        ...movie,
        release_date: format(new Date(movie.release_date), 'yyyy'),
        actors: movie.actors.map(actor => ({
          first_name: actor.first_name,
          last_name: actor.last_name,
          picture: actor.picture,
        })),
      };
    }
    
    

  async search(searchTerm: string) {
    const result = await this.movieRepository.createQueryBuilder('movie')
      .leftJoinAndSelect('movie.director', 'director')
      .leftJoinAndSelect('movie.actors', 'actors')
      .leftJoinAndSelect('movie_writer', 'writer')
      .where('movie.title ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
      .getMany();
  
    const formattedResult = result.map(movie => ({
      ...movie,
      release_date: format(new Date(movie.release_date), 'yyyy')
    }));
  
    return formattedResult;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const director = await this.directorRepository.findOne({ where: { uuid: updateMovieDto.directorId } });
    const writer = await this.directorRepository.findOne({ where: { uuid: updateMovieDto.writerId } });
    const actors = await this.actorRepository.findByIds(updateMovieDto.actorIds);
    await this.movieRepository.update(id, { ...updateMovieDto, director, writer, actors });
    return this.movieRepository.findOne({ where: { id }, relations: ['director', 'actors', 'writer'] });
  }

  async remove(id: number) {
    const movie = await this.movieRepository.findOne({ where: { id }, relations: ['director','actors','writer'] });
    if (movie) {
      await this.movieRepository.remove(movie);
    }
    return movie;
  }
}
