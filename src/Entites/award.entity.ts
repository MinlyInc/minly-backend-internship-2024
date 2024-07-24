import { Column, Entity, PrimaryColumn } from "typeorm";
import { AutoTimestamp } from "./auto-time-stamp";


@Entity()
export class Award extends AutoTimestamp{

    @PrimaryColumn({type:'bigint'})
    id: number;

    @Column({type:'varchar'})
    name: string;

    
}
