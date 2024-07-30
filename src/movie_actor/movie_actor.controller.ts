import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MovieActorService } from './movie_actor.service';
import { CreateMovieActorDto } from './dto/create-movie_actor.dto';
import { UpdateMovieActorDto } from './dto/update-movie_actor.dto';

@Controller('movie-actor')
export class MovieActorController {
  constructor(private readonly movieActorService: MovieActorService) {}

  @Post()
  create(@Body() createMovieActorDto: CreateMovieActorDto) {
    return this.movieActorService.create(createMovieActorDto);
  }

  @Get()
  findAll() {
    return this.movieActorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieActorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieActorDto: UpdateMovieActorDto) {
    return this.movieActorService.update(+id, updateMovieActorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieActorService.remove(+id);
  }
}
