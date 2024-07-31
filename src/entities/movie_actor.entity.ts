import { Column, Entity, JoinColumn, ManyToOne, ManyToMany } from "typeorm";
import { Actor } from "./actor.entity";
import { Movie } from "./movie.entity";
import { MovieAward } from './movie_award.entity';
import { BaseEntity } from "./base.entity";

@Entity()
export class MovieActor extends BaseEntity {

    @Column({ nullable: true })
    characterName: string;

    @ManyToOne(() => Actor, actor => actor.movieActor)
    @JoinColumn({ name: 'actor_id' })
    actor : Actor;

    @ManyToOne(() => Movie, movie => movie.movieActor)
    @JoinColumn({ name: 'movie_id' })
    movie: Movie;

    @ManyToMany(() => MovieAward, movieAward => movieAward.movieActors)
    awards: MovieAward[];
}
