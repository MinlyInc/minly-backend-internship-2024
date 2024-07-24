import { Module } from '@nestjs/common';
import { FestivalController } from './festival.controller';
import { FestivalService } from './festival.service';
import { Festival } from 'src/entities/festival.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Festival])],
  controllers: [FestivalController],
  providers: [FestivalService]
})
export class FestivalModule {}
