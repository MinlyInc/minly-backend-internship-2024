// src/repositories/actor.repository.ts
import { Injectable } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
import { Actor } from 'src/entities/actor.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ActorRepository {
  constructor(
    @InjectRepository(Actor)
    private readonly repository: Repository<Actor>,
  ) {}

  async findOneWithRelations(uuId: string): Promise<Actor> {
    return this.repository.findOne({
      where: { uuId },
      relations: ['awards', 'movieActorActors', 'movieActorActors.movie'],
    });
  }

  async searchByName(name?: string): Promise<Actor[]> {
    const searchCriteria: any = {};
    if (name) {
      searchCriteria.name = Like(`%${name}%`);
    }
    return this.repository.find({ where: searchCriteria });
  }

  async find(): Promise<Actor[]> {
    return this.repository.find();
  }
}
