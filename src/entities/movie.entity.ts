import { Entity, Column, ManyToMany, ManyToOne, JoinColumn, OneToMany, JoinTable } from 'typeorm';
import { Director } from './director.entity';
import { Festival } from './festival.entity';
import { MovieActor } from './movie_actor.entity';
import { BaseEntityUUID } from './base.entity.uuid';
import { Genre } from './genre.entity';


@Entity()
export class Movie extends BaseEntityUUID {
  @Column({ type: 'timestamptz' })
  release_date: Date;

  @Column()
  title: string;

  @Column({ nullable: true })
  poster: string;

  @Column({ type: 'float', nullable: true })
  average_rating: number;

  @Column({ nullable: true })
  trailer: string;

  @Column({nullable:true})
  duration:string;

  @Column({nullable:true})
  overview:string;

  @Column({nullable:true})
  language:string;

  @ManyToOne(() => Director, director => director.movies)
  @JoinColumn({ name: 'director_id' })
  director: Director;

  @ManyToOne(() => Director, writer => writer.movies, { nullable: true })
  @JoinColumn({ name: 'writer_id' })
  writer: Director;

  @OneToMany(() => MovieActor, movieActor => movieActor.movie)
  movieActor: MovieActor[];
  
  @ManyToMany(() => Festival, festival => festival.movies)
  festivals: Festival[];

  @ManyToMany(() => Genre)
  @JoinTable()
  genres: Genre[];
}
