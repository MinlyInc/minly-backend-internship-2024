import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ActorService } from './actor.service';
import { Actor } from 'src/Entites/actor.entity';
import { CreateActorDto } from './dtos/CreateActorDto';

@Controller('actor')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}
  @Post()
  async createActor(@Body() createDto: CreateActorDto) {
    return await this.actorService.CreateActor(createDto);
  }

  @Get(':uuid')
async getActorByUuid(@Param('uuid')uuid:string):Promise <Actor>{
    return this.actorService.getActorByUuid(uuid)
}

  @Get()
  async getAllActors(): Promise<Actor[]> {
    return await this.actorService.getAllActors();
  }
}
