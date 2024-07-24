import { Body, Controller, Get, Post } from '@nestjs/common';
import { ActorService } from './actor.service';
import { Actor } from 'src/Entites/actor.entity';
import { CreateActorDto } from './dtos/CreateActorDto';
import { get } from 'http';

@Controller('actor')
export class ActorController {
    constructor(
        private readonly actorService: ActorService
    ){}
    @Post()
    async create(@Body() createDto: CreateActorDto) {
        return await this.actorService.CreateActor(createDto);
        }

        @Get()
        async getAll(): Promise<Actor[]> {
            return await this.actorService.getAllActor();
            }
}
