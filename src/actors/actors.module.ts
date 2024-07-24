import { Module } from '@nestjs/common';
import { ActorsController } from './actors.controller';
import { ActorsService } from './actors.service';
import { Actor } from 'src/entities/actor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Actor])],
  controllers: [ActorsController],
  providers: [ActorsService]
})
export class ActorsModule {}
