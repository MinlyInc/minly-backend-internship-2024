import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { DirectorService } from './director.service';
import { CreateDirectorDto } from './dtos/createDirector';
import { Director } from 'src/Entites/director.entity';

@Controller('director')
export class DirectorController {
  constructor(private readonly directorService: DirectorService) {}

  @Post()
  async createDirector(@Body() createDto: CreateDirectorDto): Promise<Director> {
    return this.directorService.createDirector(createDto);
  }

  @Get()
  async findAllDirectors(): Promise<Director[]> {
    return this.directorService.findAllDirectors();
    }
}
