import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, BeforeInsert, OneToMany } from 'typeorm';
import { Movie } from './movie.entity';
import { v4 as uuidv4 } from 'uuid';
import { MovieActor } from './movie_actor.entity';
import { MovieAward } from './movie_award.entity';


@Entity()
export class Actor {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column({ unique: true })
  uuid: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ type: 'bigint', nullable: true })
  number_of_awards: number;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @OneToMany(() => MovieActor, (movieActor) => movieActor.actor)
  movieActor: MovieActor[];

  @BeforeInsert()
  generateUUID() {
    this.uuid = uuidv4();
  }
}
