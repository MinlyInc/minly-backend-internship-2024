import { Actor } from './../Entites/actor.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateActorDto } from './dtos/CreateActorDto';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
  ) {}

  async CreateActor(actorDto: CreateActorDto): Promise<Actor> {
    //   this.actorRepository.create(actorDto)
    //   return this.actorRepository.save(actorDto)
    const actorEntity = this.actorRepository.create(actorDto);
    return this.actorRepository.save(actorEntity);
  }


  async getAllActor(): Promise<Actor[]> {
    return this.actorRepository.find();
  }
}