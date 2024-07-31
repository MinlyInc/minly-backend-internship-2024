import { ActorDto } from "./actor.dto";

export class CreateMovieDto {
    release_date: Date;
    title: string;
    poster?: string;
    average_rating?: number;
    trailer?: string;
    directorId: string;
    actorDetails: { actorId: number; characterName: string }[];
    duration?: string;
    overview?: string;
    language?: string;
    writerId?:string;
    actors: ActorDto[];
    genreIds: number[];
  }
  