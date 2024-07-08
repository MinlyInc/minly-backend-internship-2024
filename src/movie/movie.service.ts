import { query } from 'express';
import { Inject, Injectable } from '@nestjs/common';
import { Movie } from 'src/Entites/movie.entity';
import { ILike, Repository } from 'typeorm';
import { CreateDto } from './dtos/createMovie';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(Movie)
        private movieRepo: Repository<Movie>,
      ) {}
   async createMovie(dto:CreateDto):Promise<Movie>{
 const movie= this.movieRepo.create(dto)
 return await this.movieRepo.save(movie)
    }

    getAllMovies(query:string ):Promise<Movie[]>{
        
       return this.movieRepo.find()
    }

    async searchMovies(query: string): Promise<Movie[]> {
      return this.movieRepo.find({
        where: {
          title: ILike(`%${query}%`),
        },
      });
    }
    filterMovies(genre?:string,year?:number,director?:string ,releaseYear?:string):Promise<Movie[]>{
     const filterCriteria:any={}


     if(genre){
      filterCriteria.genre=ILike(`%${genre}%`)
     }
     if(year){
      filterCriteria.year=ILike(`%${year}%`)
     }
     if(director){
      filterCriteria.director=ILike(`%${director}%`)
     }
     if(releaseYear){
      filterCriteria.releaseYear=ILike(`%${releaseYear}%`)
     }


return this.movieRepo.find({
   where:filterCriteria
})

    }
}
