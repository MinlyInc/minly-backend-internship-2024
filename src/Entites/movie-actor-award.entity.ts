
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { AutoTimestamp } from "./auto-time-stamp";
import { actorMoviesMovie } from "./movie-actor-actor.entity";
import { Award } from "./award.entity";



@Entity()
export class MovieActorAward{
@PrimaryColumn({type:'int4'})
year:number

@Column({type:'varchar'})
type:string

@Column({type:'varchar'})
role:string

@ManyToOne(()=> actorMoviesMovie, actorMoviesMovie=> actorMoviesMovie.movieActorAwards)
actorMoviesMovie : actorMoviesMovie

@ManyToOne(()=> Award, award=> award.movieActorAwards)
award : Award

}