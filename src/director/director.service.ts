import { Injectable } from '@nestjs/common';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Director } from 'src/entities/director.entity';

@Injectable()
export class DirectorService {
  constructor(
    @InjectRepository(Director)
    private readonly directorRepository: Repository<Director>,
  ) {}

  create(createDirectorDto: CreateDirectorDto) {
    const director = this.directorRepository.create(createDirectorDto);
    return this.directorRepository.save(director);
  }

  findOne(id: number) {
    return this.directorRepository.findOne({ where: { id } });
  }

  update(id: number, updateDirectorDto: UpdateDirectorDto) {
    return this.directorRepository.update(id, updateDirectorDto);
  }

  remove(id: number) {
    return this.directorRepository.delete(id);
  }
}
