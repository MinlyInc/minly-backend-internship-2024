import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { AutoTimestamp } from "./auto-time-stamp";
import { MovieActorAward } from "./movie-actor-award.entity";


@Entity()
export class Award extends AutoTimestamp{

    @PrimaryColumn({type:'bigint'})
    id: number;

    @Column({type:'varchar'})
    name: string;

    @OneToMany(() => MovieActorAward, movieActorAward => movieActorAward.award)
  movieActorAwards: MovieActorAward[];
}
