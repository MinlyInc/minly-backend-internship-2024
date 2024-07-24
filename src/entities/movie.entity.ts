import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
  Timestamp,
  OneToMany,
} from 'typeorm';
import { Directors } from './director.entity';
import { Festival } from './festival.entity';
import { Actor } from './actor.entity';
import { MovieActorActor } from './movieActorActor.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  releaseDate: string;

  @Column('decimal', { precision: 3, scale: 2, default: 0 })
  rating: number;

  @Column({ nullable: true })
  moviePoster: string | null;

  @Column({ nullable: true })
  trailer: string | null;

  @Column({ type: 'timestamp', nullable: true })
  createdAt: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date | null;

  @Column({ nullable: true })
  uuId: string;

  @ManyToOne(() => Directors, (director) => director.movies)
  director: Directors;
  actors: any;

  @ManyToMany(() => Actor, (actor) => actor.movies)
  @JoinTable()
  actor: Actor[];

  @Column()
  actorId: number;

  @Column()
  directorId: number;

  @Column()
  festivalId: number;

  @Column({ nullable: true })
  overview: string;

  @Column({ nullable: true })
  language: string;

  @Column({ nullable: true })
  genre: string;

  @OneToMany(() => MovieActorActor, movieActorActor => movieActorActor.movie)
  movieActorActors: MovieActorActor[];
}
