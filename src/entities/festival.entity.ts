import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Movie } from "./movie.entity";

export class Festival{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title:string

    @Column()
    date:Date

    @Column({ nullable: true })
    uuId: string;

     @ManyToMany(() => Movie, (movie) => movie.festivalId)
    movies: Movie[];
}

