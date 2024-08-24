import { Module } from '@nestjs/common';
import { DirectorController } from '../directors/directors.controller';
import { DirectorsService } from '../directors/directors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectorRepository } from 'src/repo/director.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DirectorRepository])],
  controllers: [DirectorController],
  providers: [DirectorsService]
})
export class DirectorsModule {}
