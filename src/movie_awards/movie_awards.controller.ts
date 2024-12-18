import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MovieAwardService } from './movie_awards.service';
import { CreateMovieAwardDto } from './dto/create-movie_award.dto';
import { UpdateMovieAwardDto } from './dto/update-movie_award.dto';

@Controller('movie-awards')
export class MovieAwardController {
  constructor(private readonly movieAwardService: MovieAwardService) {}

  @Post()
  create(@Body() createMovieAwardDto: CreateMovieAwardDto) {
    return this.movieAwardService.create(createMovieAwardDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieAwardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieAwardDto: UpdateMovieAwardDto) {
    return this.movieAwardService.update(+id, updateMovieAwardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieAwardService.remove(+id);
  }
}
