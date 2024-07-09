import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FestivalService } from './festival.service';
import { FestivalController } from './festival.controller';
import { Festival } from 'src/entities/festival.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Festival])],
  controllers: [FestivalController],
  providers: [FestivalService],
})
export class FestivalModule {}
