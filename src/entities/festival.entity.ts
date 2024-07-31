import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Movie } from './movie.entity';
import { BaseEntityUUID } from './base.entity.uuid';

@Entity()
export class Festival extends BaseEntityUUID {
  @Column()
  title: string;

  @Column({ type: 'date' })
  date: Date;

  @ManyToMany(() => Movie, movie => movie.festivals)
  @JoinTable({
    name: 'movie_festival',
    joinColumn: { name: 'festival_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'movie_id', referencedColumnName: 'id' },
  })
  movies: Movie[];

}
