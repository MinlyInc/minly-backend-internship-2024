import { Injectable } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actor } from 'src/entities/actor.entity';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
  ) {}

  create(createActorDto: CreateActorDto) {
    const actor = this.actorRepository.create(createActorDto);
    return this.actorRepository.save(actor);
  }

  findAll() {
    return this.actorRepository.find({ relations: ['movies'] });
  }

  findOne(id: number) {
    return this.actorRepository.findOne({ where: { id }, relations: ['movies'] });
  }

  update(id: number, updateActorDto: UpdateActorDto) {
    return this.actorRepository.update(id, updateActorDto);
  }

  remove(id: number) {
    return this.actorRepository.delete(id);
  }
}
