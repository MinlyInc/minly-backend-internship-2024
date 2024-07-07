import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Url } from "url";

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title:string;

  @Column()
  date: Date;

  @Column()
  rating: number;

  @Column()
  img: Url;
}