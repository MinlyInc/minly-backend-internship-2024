import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Awards } from '..//entities/award.entity';
import { Actor } from '../entities/actor.entity';
import { Movie } from '../entities/movie.entity';
import { AwardsService } from './awards.service';
import { AwardsController } from './awards.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Awards,Actor,Movie]),  
  ],
  providers: [AwardsService],  
  controllers: [AwardsController],  
})
export class AwardsModule {}
