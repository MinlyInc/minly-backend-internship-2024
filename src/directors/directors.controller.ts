import { Body, Controller, Get, HttpException, HttpStatus, Post, Query } from '@nestjs/common';
import { Directors } from 'src/entities/director.entity';
import { directorsService } from './directors.service'
import { CreateDirectorDto } from './dtos/createDirectorDto';



@Controller('directors')
export class directorController {
    constructor(private directorsService: directorsService) {}
    @Get()
    async findAll(): Promise<Directors[]> {
        try {
            return await this.directorsService.findAllDirectors();
          } catch (error) {

            throw new HttpException(`Failed to retrieve directors, ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post()
    async create(@Body() CreateDirectorDto: CreateDirectorDto) {
        try {
            return await this.directorsService.createDirector(CreateDirectorDto);
          } catch (error) {
            throw new HttpException(`Failed to retrieve director, ${error}`, HttpStatus.BAD_REQUEST);
          }
        }

        @Get('search')
        async search(@Query('name') name: string): Promise<Directors[]> {
          try {
            return await this.directorsService.searchDirector(name);
          } catch (error) {
            console.error('Error searching director:', error.message);
            throw new HttpException('Failed to search directors', HttpStatus.INTERNAL_SERVER_ERROR);
          }
        }
        
}

