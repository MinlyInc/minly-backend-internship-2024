import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Festival } from 'src/entities/festival.entity';
import { Like, Repository } from 'typeorm';
import { CreateFestivalDto } from './dtos/createFestivalDto';

@Injectable()
export class FestivalService {
    constructor(
        @InjectRepository(Festival)
        private actorsRepository: Repository<Festival>,
      ) {}
      async createFestival(CreateActorDto: CreateFestivalDto): Promise<Festival> {
        return await this.actorsRepository.save(CreateActorDto);
    }
    async findAllFestival() : Promise<Festival[]> {
        return  this.actorsRepository.find();
    }

    async searchFestival(name?: string): Promise<Festival[]> {
        const searchCriteria: any = {};
    
        if (name) {
          searchCriteria.name = Like(`%${name}%`);
        }
        return await this.actorsRepository.find({ where: searchCriteria });
      }
}
