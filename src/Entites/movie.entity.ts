import { generateUuid7 } from 'src/utils/uuid7';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  ManyToOne,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Director } from './director.entity';
import { Festival } from './festival.entity';
import { Writer } from './writer.entity';
import { actorMoviesMovie } from './movie-actor-actor.entity';
import { Genre } from './genre.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @Column({ type: 'timestamptz', nullable: false })
  releaseDate: Date;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  poster: string;

  @Column({ type: 'float', default:0 })
  averageRatings: number;

  @Column({ type: 'timestamptz', nullable: false })
  createdAt: Date;

  @Column({ type: 'timestamptz', nullable: false })
  updatedAt: Date;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  trailer: string;

  @Column({ type: 'varchar', nullable: true })
  overview: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  genre: string;

  @Column({ type: 'varchar' })
  uuid: string;

  @ManyToOne(() => Director, (director) => director.movies)
  director: Director;

  @ManyToMany(() => Festival, (festival) => festival.movies)
  festival: Festival[];

  @OneToMany(() => actorMoviesMovie, (movieActorActor) => movieActorActor.movie)
  movieActorActors: actorMoviesMovie[];

  @ManyToMany(() => Writer, (writer) => writer.movies)
  writer: Writer[];

  @ManyToMany(() => Genre, genre => genre.movies)
  genres: Genre[]; 

  @BeforeInsert()
  generateId() {
    this.uuid = generateUuid7();
  }
}
