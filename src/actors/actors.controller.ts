import { Controller, Get, Param } from '@nestjs/common';
import { ActorsService } from './actors.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ActorDetailsResponse } from './swagger-model/actor-details';

@ApiTags('actors')
@Controller('actors')
export class ActorsController {
    constructor(readonly actorsService: ActorsService){}

    
    @Get(':uuid')
    @ApiResponse({ status: 200, description: 'Get actor details', type: ActorDetailsResponse })
    async getActorWithAwardsByUuid(@Param('uuid') uuid : string) {
        return this.actorsService.getActorWithAwardsByUuid(uuid) ;
    }
}
