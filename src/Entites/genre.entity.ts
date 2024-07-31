import { generateUuid7 } from 'src/utils/uuid7';
import { BeforeInsert, JoinTable, ManyToMany } from 'typeorm';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Movie } from './movie.entity';


@Entity()
export class Genre {
    @PrimaryGeneratedColumn({type:'int'})
    id: number;

    @Column({type:'varchar'})
    name: string;

    @Column({type:'varchar'})
    uuid:string

    @BeforeInsert()
    generateUuid7(){
        this.uuid = generateUuid7();
    }

    @ManyToMany(() => Movie, movie => movie.genres)
    @JoinTable()
    movies: Movie[];
}