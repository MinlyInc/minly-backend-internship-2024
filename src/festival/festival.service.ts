import { Injectable } from '@nestjs/common';
import { CreateFestivalDto } from './dto/create-festival.dto';
import { UpdateFestivalDto } from './dto/update-festival.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Festival } from 'src/entities/festival.entity';

@Injectable()
export class FestivalService {
  constructor(
    @InjectRepository(Festival)
    private readonly festivalRepository: Repository<Festival>,
  ) {}

  create(createFestivalDto: CreateFestivalDto) {
    const festival = this.festivalRepository.create(createFestivalDto);
    return this.festivalRepository.save(festival);
  }

  findAll() {
    return this.festivalRepository.find({ relations: ['movies'] });
  }

  findOne(id: number) {
    return this.festivalRepository.findOne({ where: { id }, relations: ['movies'] });
  }

  update(id: number, updateFestivalDto: UpdateFestivalDto) {
    return this.festivalRepository.update(id, updateFestivalDto);
  }

  remove(id: number) {
    return this.festivalRepository.delete(id);
  }
}
