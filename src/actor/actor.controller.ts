import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ActorService } from './actor.service';
import { Actor } from 'src/Entites/actor.entity';
import { CreateActorDto } from './dtos/CreateActorDto';
import { get } from 'http';

@Controller('actor')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}
  @Post()
  async create(@Body() createDto: CreateActorDto) {
    return await this.actorService.CreateActor(createDto);
  }

  @Get(':uuid')
async getByUuid(@Param('uuid')uuid:string):Promise <Actor>{
    return this.actorService.getActorByUuid(uuid)
}

  @Get()
  async getAll(): Promise<Actor[]> {
    return await this.actorService.getAllActor();
  }
}
