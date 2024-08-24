// src/actor/actor.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor } from '../entities/actor.entity';
import { ActorService } from '../actors/actors.service';
import { ActorsController } from '../actors/actors.controller';
import { ActorRepository } from '../repo/actor.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Actor])],
  providers: [ActorService, ActorRepository],
  controllers: [ActorsController],
})
export class ActorModule {}
