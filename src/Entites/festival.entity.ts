import { generateUuid7 } from 'src/utils/uuid7';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Movie } from './movie.entity';

@Entity()
export class Festival {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar' })
  title: Date;

  @Column({ type: 'varchar' })
  uuid: string;

  @ManyToMany(() => Movie, (movie) => movie.festival)
  @JoinTable()
  movies: Movie[];

  @BeforeInsert()
  generateUuid7() {
    this.uuid = generateUuid7();
  }
}
