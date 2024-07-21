import { query } from 'express';
import { Inject, Injectable } from '@nestjs/common';
import { Movie } from 'src/Entites/movie.entity';
import { ILike, Repository } from 'typeorm';
import { CreateMovieDto } from './dtos/createMovie';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from './dtos/PaginationDto';

@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(Movie)
        private movieRepo: Repository<Movie>,
      ) {}
   async createMovie(dto:CreateMovieDto):Promise<Movie>{
 const movie= this.movieRepo.create(dto)
 return await this.movieRepo.save(movie)
    }


    async getMovieById(uuid:string):Promise<Movie>{
      return await this.movieRepo.findOne({where:{uuid}})
    }

    getAllMovies(query:string ):Promise<Movie[]>{
  
       return this.movieRepo.find()
    }
    
 
    async pagination(paginationDto: PaginationDto): Promise<{ data: Movie[], total: number }> {
      const { page, limit, search, sortOrder, sortField } = paginationDto;
      // const validSortFields = ['title', 'releaseDate', 'averageRatings'];
    
      const queryBuilder = this.movieRepo.createQueryBuilder('movie');
  
      if (search) {
        queryBuilder.where('movie.title LIKE :search', { search: `%${search}%` });
      }
  
      if (sortField) {
        
        const order = sortOrder?.toUpperCase() as 'ASC' | 'DESC' || 'ASC';
        queryBuilder.orderBy(`movie.${sortField}`, order);
      }
  
      const [data, total] = await queryBuilder
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();
  
      return { data, total };
    }
    


//     async searchMovies(query: string): Promise<Movie[]> {
//       return this.movieRepo.find({
//         where: {
//           title: ILike(`%${query}%`),
//         },
//       });
//     }
//     filterMovies(genre?:string,year?:number,director?:string ,releaseYear?:string):Promise<Movie[]>{
//      const filterCriteria:any={}


//      if(genre){
//       filterCriteria.genre=ILike(`%${genre}%`)
//      }
//      if(year){
//       filterCriteria.year=ILike(`%${year}%`)
//      }
//      if(director){
//       filterCriteria.director=ILike(`%${director}%`)
//      }
//      if(releaseYear){
//       filterCriteria.releaseYear=ILike(`%${releaseYear}%`)
//      }


// return this.movieRepo.find({
//    where:filterCriteria
// })

//     }
}
