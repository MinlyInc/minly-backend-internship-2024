import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, BeforeInsert } from 'typeorm';
import { Movie } from './movie.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Festival {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ unique: true })
  uuid: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @ManyToMany(() => Movie, movie => movie.festivals)
  @JoinTable({
    name: 'movie_festival',
    joinColumn: { name: 'festival_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'movie_id', referencedColumnName: 'id' },
  })
  movies: Movie[];

  
  @BeforeInsert()
  generateUUID() {
    this.uuid = uuidv4();
  }
  
}
