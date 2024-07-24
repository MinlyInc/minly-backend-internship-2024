import { Timestamp } from "typeorm";

export class CreateMovieDto {
    id:number
    title: string
    releaseDate:string;
    rating:number;
    moviePoster:string |null;
    createdAt:Date  |null;
    updatedAt:Date |null;;
    trailer:string |null ;
    uuId: string;
    directorId: number;
    actorId:number
    festivalId:number
}