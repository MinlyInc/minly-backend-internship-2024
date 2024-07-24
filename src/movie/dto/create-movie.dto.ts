export class CreateMovieDto {
    release_date: Date;
    title: string;
    poster?: string;
    average_rating?: number;
    trailer?: string;
    directorId: string;
    actorIds: string[];
    duration?: string;
    overview?: string;
    language?: string;
    genres?: string[];
    writerId?:string;
  }
  