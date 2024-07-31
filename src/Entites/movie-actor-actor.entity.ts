import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Movie } from './movie.entity';
import { Actor } from './actor.entity';
import { MovieActorAward } from './movie-actor-award.entity';

@Entity()
export class actorMoviesMovie {
  @PrimaryColumn({ type: 'bigint' })
  movieId: number;

  @PrimaryColumn({ type: 'bigint' })
  actorId: number;

  @Column({ type: 'varchar', nullable: true })
  character: string;

  @ManyToOne(() => Movie, (movie) => movie.movieActorActors)
  movie: Movie;

  @ManyToOne(() => Actor, (actor) => actor.movieActorActors)
  actor: Actor;

  @OneToMany(
    () => MovieActorAward,
    (movieActorAward) => movieActorAward.actorMoviesMovie,
  )
  movieActorAwards: MovieActorAward[];
}
