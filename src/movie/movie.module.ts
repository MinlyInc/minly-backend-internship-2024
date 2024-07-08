import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { Movie } from 'src/entities/movie.entity';
import { DirectorModule } from 'src/director/director.module';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), DirectorModule],
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService],
})
export class MovieModule {}
