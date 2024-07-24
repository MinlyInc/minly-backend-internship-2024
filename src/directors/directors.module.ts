import { Module } from '@nestjs/common';
import { directorController } from './directors.controller';
import { directorsService } from './directors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Directors } from 'src/entities/director.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Directors])],
  controllers: [directorController],
  providers: [directorsService]
})
export class DirectorsModule {}
