import { Entity, Column, OneToMany} from 'typeorm';
import { Movie } from './movie.entity';
import { BaseEntityUUID } from './base.entity.uuid';


@Entity()
export class Director extends BaseEntityUUID {

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ type: 'date' })
  birth_date: Date;

  @Column({ nullable: true })
  bio: string;

  @Column({ type: 'enum', enum: ['male', 'female', 'other'] })
  gender: string;

  @Column()
  nationality: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ type: 'bigint', nullable: true })
  number_of_awards: number;

  @Column({ type: 'enum', enum: ['director', 'writer'], default: 'director' })
  type: 'director' | 'writer';

  @OneToMany(() => Movie, movie => movie.director)
  movies: Movie[];
}
