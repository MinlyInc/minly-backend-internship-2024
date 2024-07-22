import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn, BeforeInsert } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Director } from './director.entity';
import { Actor } from './actor.entity';
import { Festival } from './festival.entity';


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

  @Column({ unique: true, type: 'uuid' })
  uuid: string;

  @Column({ nullable: true })
  trailer: string;

  @Column({nullable:true})
  duration:string;

  @Column({nullable:true})
  overview:string;

  @Column({nullable:true})
  language:string;

  @Column("text", { array: true, default: [] })
  genres: string[];

  @ManyToOne(() => Director, director => director.movies)
  @JoinColumn({ name: 'director_id' })
  director: Director;

  @ManyToOne(() => Director, writer => writer.movies, { nullable: true })
  @JoinColumn({ name: 'writer_id' })
  writer: Director;

  @ManyToMany(() => Actor, actor => actor.movies)
  @JoinTable({
    name: 'movie_actor',
    joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'actor_id', referencedColumnName: 'id' },
  })
  actors: Actor[];

  @ManyToMany(() => Festival, festival => festival.movies)
  festivals: Festival[];

  @BeforeInsert()
  generateUUID() {
    if (!this.uuid) {
      this.uuid = uuidv4();
    }
  }
}
