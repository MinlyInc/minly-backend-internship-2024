import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Movie } from "./movie.entity";
import { Actor } from "./actor.entity"; 

@Entity()
export class Awards {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Actor, actor => actor.awards)
    @JoinTable()
    actors: Actor[];

    @ManyToMany(() => Movie, movie => movie.awards)
    @JoinTable()
    movies: Movie[];
}
