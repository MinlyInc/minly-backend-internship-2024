import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Director } from 'src/Entites/director.entity';
import { Repository } from 'typeorm';
import { CreateDirectorDto } from './dtos/createDirector';

@Injectable()
export class DirectorService {
   constructor(
    @InjectRepository(Director)
    private directorRepository: Repository<Director>
   ){}

   async createDirector(dto:CreateDirectorDto):Promise<Director>{
   const director=this.directorRepository.create(dto)
   return this.directorRepository.save(director)
   }

   async findAllDirectors():Promise<Director[]>{
      return this.directorRepository.find()
   }
}
