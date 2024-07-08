import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateDto } from './dtos/createMovie';
import { MovieService } from './movie.service';
import { Movie } from 'src/Entites/movie.entity';
import { get } from 'http';
import { query } from 'express';

@Controller('movie')
export class MovieController {
    constructor(private movieService : MovieService){}


    @Get()
    async getAllMovies(@Query('search') query: string,@Query ('filter')filter:string): Promise<Movie[]> {
       return await this.movieService.getAllMovies(query);
       
    }

    
    @Post()
   async create(@Body() createdto : CreateDto):Promise<Movie>{
     return await this.movieService.createMovie(createdto)
       ;
    }

   

}
