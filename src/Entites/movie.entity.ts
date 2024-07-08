import { generateUuid7 } from "src/utils/uuid7";
import { Entity, PrimaryGeneratedColumn, Column, Timestamp, BeforeInsert, ManyToOne, ManyToMany } from "typeorm"
import { Director } from "./director.entity";
import { Actor } from "./actor.entity";

@Entity()
export class Movie {
    @PrimaryGeneratedColumn({type:'bigint'})
    id: number

    @Column({type:'varchar', length:255,nullable:false})
    title: string;

    @Column({type:'timestamptz',nullable:false})
    releaseDate: Date;

    @Column({type:'varchar',length:1000,nullable:true})
    poster:string

    @Column({type:'float',nullable:true})
    averageRatings:number

    @Column({type:'timestamptz',nullable:false})
    createdAt:Date;

    @Column({type:'timestamptz',nullable:false})
    updatedAt:Date;

    @Column({type:'bigint',nullable:false})
    directorID:Number;

    @Column({type:'varchar',length:1000,nullable:true})
    trailer:string;

    @Column({type:'varchar'})
    uuid: string;

    @ManyToOne(() => Director, director => director.movies)
    director: Director;


    @ManyToMany(() => Actor, actor => actor.movies)
    actor: Actor[];

    @BeforeInsert()
  generateId() {
    this.uuid = generateUuid7();
  }
}
