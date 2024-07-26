import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeUpdate, ManyToOne, ManyToMany, JoinTable, BeforeInsert, JoinColumn, OneToMany } from 'typeorm';
import { AutoTimestamp } from './auto-time-stamp';
import { uuidv7 } from '@kripod/uuidv7';
import { Actor } from './actor.entity';
import { Festival } from './festival.entity';
import { Director } from './director.entity';
import { Category } from './category.entity';
import { Language } from './language.entity';
import { Writer } from './writer.entity';
import { MovieActor } from './movie-actor.entity';
import { MovieActorAward } from './movie-actor-award.entity';


@Entity()
export class Movie extends AutoTimestamp {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', unique: true })
  uuid: string;
  

  @Column({ type: 'varchar', length: 1000, nullable: true })
  poster: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @Column({ type: 'float', nullable: true })
  average_rating: number;

  @CreateDateColumn({ type: 'timestamptz' })
  release_date: Date;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  trailer: string;


  @Column({ type: 'text', nullable: true })
  overview: string;


  @ManyToOne(() => Director, (director) => director.movies)
  @JoinColumn({ name: 'director_id' }) // Ensure this is explicitly set
  director: Director;


  @BeforeInsert()
  generateUUID() {
    this.uuid = uuidv7();
  }

  @OneToMany(() => MovieActor, (movieActor) => movieActor.movie)
  movieActors: MovieActor[];

  @OneToMany(() => MovieActorAward, (movieActorAward) => movieActorAward.movie)
  movieActorAwards: MovieActorAward[]; 

  @ManyToMany(() => Festival, (festival) => festival.movies)
  @JoinTable({
    name: 'movie_festival',
    joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'festival_id', referencedColumnName: 'id' }
  })
  festivals: Festival[];

  @ManyToMany(() => Category, (category) => category.movies)
  @JoinTable({
    name: 'movie_category',
    joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' }
  })
  categories: Category[];

  @ManyToOne(() => Language, (language) => language.movies)
  @JoinColumn({ name: 'language_id' }) // Ensure this is explicitly set
  language: Language;

  @ManyToMany(() => Writer, (writer) => writer.movies)
  @JoinTable({
    name: 'movie_writer',
    joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'writer_id', referencedColumnName: 'id' }
  })
  writers: Writer[];
  
}
