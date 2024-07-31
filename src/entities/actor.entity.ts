import { Entity, Column, OneToMany } from 'typeorm';
import { MovieActor } from './movie_actor.entity';
import { BaseEntityUUID } from './base.entity.uuid';


@Entity()
export class Actor extends BaseEntityUUID {
  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ type: 'date' })
  birth_date: Date;

  @Column({ type: 'enum', enum: ['male', 'female', 'other'] })
  gender: string;

  @Column({ nullable: true })
  bio: string;

  @Column()
  nationality: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ type: 'bigint', nullable: true })
  number_of_awards: number;

  @OneToMany(() => MovieActor, (movieActor) => movieActor.actor)
  movieActor: MovieActor[];
}
