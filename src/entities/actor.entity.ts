import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Movie } from './movie.entity';
import { MovieActorActor } from './movieActorActor.entity';
import { Awards } from './award.entity';


export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
}

@Entity()
export class Actor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  birthDate: string;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.MALE,
  })
  gender: Gender;

  @Column()
  nationality: string;

  @Column()
  bio: string;

  @Column({ nullable: true })
  numberOfAwards: number;

  @Column({ nullable: true })
  @Column()
  picture: string;

  @Column({ type: 'timestamp', nullable: true })
  @Column({ type: 'timestamp'})
  createdAt: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  @Column({ type: 'timestamp'})
  updatedAt: Date | null;

  @Column({ nullable: true })
  uuId: string;

  @ManyToMany(() => Movie, (movie) => movie.actors)
  movies: Movie[];

  @OneToMany(() => MovieActorActor, (movieActorActor) => movieActorActor.actor)
  movieActorActors: MovieActorActor[];

  @ManyToMany(() => Awards, (award) => award.actors)
  awards: Awards[];
}
