import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Director } from './director.entity';
import { Actor } from './actor.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz' })
  release_date: Date;

  @Column()
  title: string;

  @Column({ nullable: true })
  poster: string;

  @Column({ type: 'float', nullable: true })
  average_rating: number;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @ManyToOne(() => Director, director => director.movies)
  @JoinColumn({ name: 'director_id' })
  director: Director;

  @Column({ unique: true })
  uuid: string;

  @Column({ nullable: true })
  trailer: string;

  @ManyToMany(() => Actor, actor => actor.movies)
  @JoinTable({
    name: 'movie_actor',
    joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'actor_id', referencedColumnName: 'id' },
  })
  actors: Actor[];

  @BeforeInsert()
  generateUUID() {
    this.uuid = uuidv4();
  }
}
