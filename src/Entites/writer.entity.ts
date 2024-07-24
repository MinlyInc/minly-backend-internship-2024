import { generateUuid7 } from 'src/utils/uuid7';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  BeforeInsert,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Gender } from './gender.enum';
import { AutoTimestamp } from './auto-time-stamp';
import { Movie } from './movie.entity';

@Entity()
export class Writer extends AutoTimestamp {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'enum', enum: Gender })
  gender: string;

  @Column({ type: 'varchar', nullable: false })
  firstName: string;

  @Column({ type: 'varchar', nullable: false })
  lastName: string;

  @Column({ type: 'date', nullable: true })
  birthDate: Date;

  @Column({ type: 'varchar', nullable: true })
  nationality: string;

  @Column({ type: 'varchar' })
  uuid: string;

  @ManyToMany(() => Movie, (movie) => movie.writer)
  movies: Movie[];

  @BeforeInsert()
  generateUuid7() {
    this.uuid = generateUuid7();
  }
}