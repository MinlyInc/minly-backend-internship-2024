import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";

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
  img: string;
}