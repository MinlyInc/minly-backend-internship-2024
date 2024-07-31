import {Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { Movie } from "./movie.entity";
import { BaseEntity } from "./base.entity";

@Entity()
export class Genre extends BaseEntity{

    @Column()
    name:string;

    @ManyToMany(() => Movie, movie => movie.genres)
    @JoinTable()
    movies:Movie[];
}
