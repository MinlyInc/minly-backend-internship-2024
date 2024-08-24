import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Directors } from 'src/entities/director.entity';
import { DirectorRepository } from '../repo/director.repository';

@Injectable()
export class DirectorsService {
  constructor(
    @InjectRepository(DirectorRepository)
    private directorsRepository: DirectorRepository,
  ) {}

  async findAllDirectors(): Promise<Directors[]> {
    try {
      return await this.directorsRepository.find();
    } catch (error) {
      throw new HttpException(
        `Failed to retrieve directors, ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async searchDirector(name?: string): Promise<Directors[]> {
    try {
      return await this.directorsRepository.searchByName(name);
    } catch (error) {
      throw new HttpException(
        `Failed to search directors, ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
