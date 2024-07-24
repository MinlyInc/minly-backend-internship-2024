import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from 'src/entities/actor.entity';
import { Like, Repository } from 'typeorm';
import { CreateActorDto } from './dtos/createActorDto';

@Injectable()
export class ActorsService {
    constructor(
        @InjectRepository(Actor)
        private actorsRepository: Repository<Actor>,
      ) {}
      async createActor(CreateActorDto: CreateActorDto): Promise<Actor> {
        return await this.actorsRepository.save(CreateActorDto);
    }
    async findAllActors() : Promise<Actor[]> {
        return  this.actorsRepository.find();
    }

    async searchActors(name?: string): Promise<Actor[]> {
        const searchCriteria: any = {};
    
        if (name) {
          searchCriteria.name = Like(`%${name}%`);
        }
        return await this.actorsRepository.find({ where: searchCriteria });
      }

    

}
