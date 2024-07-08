import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, BeforeInsert } from 'typeorm';
import { Movie } from './movie.entity';
import { v4 as uuidv4 } from 'uuid';


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

  @ManyToMany(() => Movie, movie => movie.actors)
  movies: Movie[];

  @BeforeInsert()
  generateUUID() {
    this.uuid = uuidv4();
  }
}
