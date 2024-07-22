import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm';
import { Movie } from './movie.entity';
import { v4 as uuidv4 } from 'uuid';


@Entity()
export class Director {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column({ unique: true })
  uuid: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ type: 'bigint', nullable: true })
  number_of_awards: number;

  @Column({ type: 'enum', enum: ['director', 'writer'], default: 'director' })
  type: 'director' | 'writer';

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @OneToMany(() => Movie, movie => movie.director)
  movies: Movie[];

  @BeforeInsert()
  generateUUID() {
    this.uuid = uuidv4();
  }
}
