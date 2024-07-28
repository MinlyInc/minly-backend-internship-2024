import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from 'src/Entites/actor.entity';
import { Award } from 'src/Entites/award.entity';
import { actorMoviesMovie } from 'src/Entites/movie-actor-actor.entity';
import { MovieActorAward } from 'src/Entites/movie-actor-award.entity';
import { Movie } from 'src/Entites/movie.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class MovieActorService {
    constructor(
        @InjectRepository(MovieActorAward)
        private readonly movieActorAwardRepository: Repository<MovieActorAward>,
        @InjectRepository(actorMoviesMovie)
        private readonly actorMoviesMovieRepository: Repository<actorMoviesMovie>,
        @InjectRepository(Award)
        private readonly awardRepository: Repository<Award>,
        @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
      ){}

    getAllData():Promise<MovieActorAward[]>{
        return this.movieActorAwardRepository.find({relations:['actorMoviesMovie.actor','actorMoviesMovie.movie', 'award']});
    }

    async getDetailsByUuid(uuid: string): Promise<MovieActorAward[]> {
        // Find the actor by UUID
        const actor = await this.actorRepository.findOne({
          where: { uuid },
        });
    
        if (!actor) {
          throw new Error('Actor not found');
        }
    
        // Find all actorMoviesMovie records for this actor
        const actorMovies = await this.actorMoviesMovieRepository.find({
          where: { actorId: actor.id },
        });
    
        // Find all MovieActorAwards for these actorMovies
        const movieActorAwards = await this.movieActorAwardRepository.find({
          where: {
            actorMoviesMovie: actorMovies.map(am => ({
              movieId: am.movieId,
              actorId: am.actorId,
            })),
          },relations:['actorMoviesMovie.movie','award']
        });
    
        return movieActorAwards;
      }
    }

