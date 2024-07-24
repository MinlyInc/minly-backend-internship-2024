import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Movie } from "./movie.entity";
import { Actor } from "./actor.entity";

@Entity()
export class MovieActorActor {
  @PrimaryColumn({ type: 'bigint' })
  movieId: number;

  @PrimaryColumn({ type: 'bigint' })
  actorId: number;

  @Column({ type: 'varchar', nullable: true })
  character: string;

  @ManyToOne(() => Movie, movie => movie.movieActorActors)
  @JoinColumn({ name: 'movieId' })
  movie: Movie;

  @ManyToOne(() => Actor, actor => actor.movieActorActors)
  @JoinColumn({ name: 'actorId' })
  actor: Actor;
}