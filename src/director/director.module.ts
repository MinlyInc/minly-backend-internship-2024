import { Module } from '@nestjs/common';
import { DirectorService } from './director.service';
import { DirectorController } from './director.controller';
import { Director } from 'src/Entites/director.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Director])],
  providers: [DirectorService],
  controllers: [DirectorController]
})
export class DirectorModule {}
