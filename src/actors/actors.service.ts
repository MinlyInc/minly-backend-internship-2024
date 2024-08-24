// src/actor/actor.service.ts
import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { ActorRepository } from '../repo/actor.repository';
import { Actor } from 'src/entities/actor.entity';

@Injectable()
export class ActorService {
  constructor(
    private readonly actorRepository: ActorRepository,
  ) {}

  async findAllActors(): Promise<Actor[]> {
    try {
      return await this.actorRepository.find();
    } catch (error) {
      throw new HttpException(
        `Failed to retrieve actors, ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async searchActors(name?: string): Promise<Actor[]> {
    try {
      return await this.actorRepository.searchByName(name);
    } catch (error) {
      throw new HttpException(
        `Failed to search actors, ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getActorByUuId(uuId: string): Promise<Actor> {
    try {
      const actor = await this.actorRepository.findOneWithRelations(uuId);

      if (!actor) {
        throw new NotFoundException(`Actor with ID ${uuId} not found`);
      }
      return actor;
    } catch (error) {
      throw new HttpException(
        `Failed to retrieve actor, ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
