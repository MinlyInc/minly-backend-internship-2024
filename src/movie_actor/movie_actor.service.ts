import { Injectable } from '@nestjs/common';
import { CreateMovieActorDto } from './dto/create-movie_actor.dto';
import { UpdateMovieActorDto } from './dto/update-movie_actor.dto';

@Injectable()
export class MovieActorService {
  create(createMovieActorDto: CreateMovieActorDto) {
    return 'This action adds a new movieActor';
  }

  findAll() {
    return `This action returns all movieActor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movieActor`;
  }

  update(id: number, updateMovieActorDto: UpdateMovieActorDto) {
    return `This action updates a #${id} movieActor`;
  }

  remove(id: number) {
    return `This action removes a #${id} movieActor`;
  }
}
