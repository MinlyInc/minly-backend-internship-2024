import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { MovieActor } from './movie_actor.entity';

@Entity()
export class MovieAward {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  awardName: string;

  @Column()
  category: string;

  @Column()
  year: number;

  @ManyToMany(() => MovieActor, movieActor => movieActor.awards)
  @JoinTable({
    name: 'movie_awards_movie_actors',
    joinColumn: { name: 'movieAward_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'movieActor_id', referencedColumnName: 'id' }
  })
  movieActors: MovieActor[];
}
