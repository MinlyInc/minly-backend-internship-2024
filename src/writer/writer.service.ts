import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/Entites/movie.entity';
import { Writer } from 'src/Entites/writer.entity';
import { Repository } from 'typeorm';
import { CreateWriterDto } from './dto/CreateWriterDto';

@Injectable()
export class WriterService {
    constructor(
        @InjectRepository(Writer)
        private readonly writerRepository: Repository<Writer>,
    ){}

    async createWriter(createDto:CreateWriterDto){
    const writer= this.writerRepository.create(createDto)
    return this.writerRepository.save(writer)
    }

    async getAllWriter(){
        return this.writerRepository.find()
    }
}
