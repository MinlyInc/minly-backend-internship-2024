import { Column, Entity, PrimaryColumn } from "typeorm";
import { AutoTimestamp } from "./auto-time-stamp";


@Entity()
export class MovieActorAward extends AutoTimestamp{
@PrimaryColumn({type:''})


}