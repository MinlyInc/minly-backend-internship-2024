import { Module } from '@nestjs/common';
import { WriterController } from './writer.controller';
import { WriterService } from './writer.service';
import { Writer } from 'src/Entites/writer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from 'src/Entites/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Writer])],
  controllers: [WriterController],
  providers: [WriterService]
})
export class WriterModule {}
