import { generateUuid7 } from 'src/utils/uuid7';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { Gender } from './gender.enum';
import { AutoTimestamp } from './auto-time-stamp';
import { actorMoviesMovie } from './movie-actor-actor.entity';

@Entity()
export class Actor extends AutoTimestamp {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'enum', enum: Gender })
  gender: string;

  @Column({ type: 'varchar', nullable: false })
  firstName: string;

  @Column({ type: 'varchar', length: 1000 ,nullable:true})
  bio: string;

  @Column({ type: 'varchar', nullable: false })
  lastName: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  picture: string;

  @Column({ type: 'date', nullable: true })
  birthDate: Date;

  @Column({ type: 'varchar', nullable: true })
  nationality: string;

  @Column({ type: 'int', default:0 })
  numberOfAwards: number;

  @Column({ type: 'varchar' })
  uuid: string;

  @OneToMany(() => actorMoviesMovie, (movieActorActor) => movieActorActor.actor)
  movieActorActors: actorMoviesMovie[];

  @BeforeInsert()
  generateUuid7() {
    this.uuid = generateUuid7();
  }
}
