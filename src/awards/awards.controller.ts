import { Controller, Get, Post, Body } from '@nestjs/common';
import { AwardsService } from './awards.service';
import { Awards } from '../entities/award.entity';
// import { createAwardDto } from '../awards/dtos/awardsDto';

@Controller('awards')
export class AwardsController {
  constructor(private readonly awardsService: AwardsService) {}

  @Post()
  // async create(@Body() createAwardDto: createAwardDto): Promise<Awards> {
  //   const { name, actorsIds, moviesIds } = createAwardDto;
  //   return this.awardsService.createAwardWithRelations(name, actorsIds, moviesIds);
  // }

  @Get()
  async findAll(): Promise<Awards[]> {
    return this.awardsService.findAll();
  }
}
