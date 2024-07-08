import { generateUuid7 } from "src/utils/uuid7";
import { Entity, PrimaryGeneratedColumn, Column, Timestamp, BeforeInsert, OneToMany } from "typeorm"
import { Gender } from "./gender.enum";
import { AutoTimestamp } from "./auto-time-stamp";
import { Movie } from "./movie.entity";

@Entity()
export class Director extends AutoTimestamp {
    @PrimaryGeneratedColumn({type:'bigint'})
    id: number

    @Column({type:'varchar', length:255,nullable:false})
    title: string;


    @Column({type:'enum',enum:Gender})
    genre: Gender;

    @Column({type:'varchar',nullable:false})
    firstName: string;

    @Column({type:'varchar',nullable:false})
    lastName: string;

    @Column({type:'varchar',length:1000,nullable:true})
    picture:string

    @Column({type:'date',nullable:true})
    birthDate:Date

    @Column({type:'varchar',nullable:true})
    nationality:string;

    @Column({type:'varchar',length:1000,nullable:true})
    trailer:string;

    @Column({type:'bigint',nullable:true})
        numberOfAward:Number
    

    @Column({type:'varchar'})
    uuid: string;

    @OneToMany(() => Movie, movie => movie.director)
    movies: Movie[];

    
    @BeforeInsert()
  generateUuid7() {
    this.uuid = generateUuid7();
  }
}