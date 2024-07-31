
import { Controller, Get, Param } from '@nestjs/common';
import { MovieActorService } from './movie-actor.service';
import { MovieActorAward } from 'src/Entites/movie-actor-award.entity';

@Controller('award')
export class MovieActorController {
    constructor(
        private readonly movieActorService: MovieActorService
    ) {}

    @Get()
    getAllDetails():Promise<MovieActorAward[]>{
        return this.movieActorService.getAllData();
    }

    @Get(':uuid')
    getDetailsByUuid(@Param('uuid') uuid: string): Promise<any> {
        return this.movieActorService.getDetailsByUuid(uuid);
    }

}
