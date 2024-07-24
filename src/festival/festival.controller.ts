import { Body, Controller, Get, HttpException, HttpStatus, Post, Query } from '@nestjs/common';
import { FestivalService } from './festival.service';
import { Festival } from 'src/entities/festival.entity';
import { CreateFestivalDto } from './dtos/createFestivalDto';


@Controller('festival')
export class FestivalController {
    constructor(private FestivalService: FestivalService) {}
    @Get()
    async findAll(): Promise<Festival[]> {
        try {
            return await this.FestivalService.findAllFestival();
          } catch (error) {

            throw new HttpException(`Failed to retrieve festival, ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post()
    async create(@Body() CreateFestivalDto: CreateFestivalDto) {
        try {
            return await this.FestivalService.createFestival(CreateFestivalDto);
          } catch (error) {
            throw new HttpException(`Failed to retrieve festival, ${error}`, HttpStatus.BAD_REQUEST);
          }
        }

        @Get('search')
        async search(@Query('name') name: string): Promise<Festival[]> {
          try {
            return await this.FestivalService.searchFestival(name);
          } catch (error) {
            console.error('Error searching festival:', error.message);
            throw new HttpException('Failed to search festival', HttpStatus.INTERNAL_SERVER_ERROR);
          }
        }
}
