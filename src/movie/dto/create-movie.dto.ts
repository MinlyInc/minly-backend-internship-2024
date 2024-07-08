export class CreateMovieDto {
    release_date: Date;
    title: string;
    poster?: string;
    average_rating?: number;
    trailer?: string;
    directorId: number;
  }
  