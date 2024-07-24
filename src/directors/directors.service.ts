import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Directors } from 'src/entities/director.entity';
import { Like, Repository } from 'typeorm';
import { CreateDirectorDto } from './dtos/createDirectorDto';

@Injectable()
export class directorsService {
    constructor(
        @InjectRepository(Directors)
        private directorsRepository: Repository<Directors>,
      ) {}
      async createDirector(createDirectorDto: CreateDirectorDto): Promise<Directors> {
        return await this.directorsRepository.save(createDirectorDto);
    }
    async findAllDirectors() : Promise<Directors[]> {
        return  this.directorsRepository.find();
    }

    async searchDirector(name?: string): Promise<Directors[]> {
        const searchCriteria: any = {};
    
        if (name) {
          searchCriteria.name = Like(`%${name}%`);
        }
        return await this.directorsRepository.find({ where: searchCriteria });
      }

    

}
