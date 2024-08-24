import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Directors } from 'src/entities/director.entity';
import { DirectorsService } from '../directors/directors.service';

@Controller('directors')
export class DirectorController {
  constructor(private directorsService: DirectorsService) {}

  @Get()
  async findAll(): Promise<Directors[]> {
    return this.directorsService.findAllDirectors();
  }

  @Get('search')
  async search(@Query('name') name: string): Promise<Directors[]> {
    return this.directorsService.searchDirector(name);
  }
}
