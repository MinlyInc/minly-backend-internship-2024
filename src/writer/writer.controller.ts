import { writer } from 'repl';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { WriterService } from './writer.service';
import { CreateWriterDto } from './dto/CreateWriterDto';
import { Writer } from 'src/Entites/writer.entity';

@Controller('writer')
export class WriterController {
    constructor(private readonly writerService: WriterService) {}
    @Post()
    async create(@Body()writerDto:CreateWriterDto):Promise<Writer>{
        return this.writerService.createWriter(writerDto);
    }

    @Get()
    async getAllWriter():Promise<Writer[]>{
        return this.writerService.getAllWriter();
    }
}
