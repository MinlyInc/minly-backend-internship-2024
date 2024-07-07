import { Global, Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';

@Global()
@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
  exports:[MoviesService]
})
export class MoviesModule {}
