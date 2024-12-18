export class CreateActorDto {
    
    first_name: string;
    last_name: string;
    birth_date: Date;
    bio?: string;
    gender: 'male' | 'female' | 'other';
    nationality: string;
    picture?: string;
    number_of_awards?: number;
  }
  