import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectorService } from './director.service';
import { DirectorController } from './director.controller';
import { Director } from 'src/entities/director.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Director])],
  controllers: [DirectorController],
  providers: [DirectorService],
  exports: [TypeOrmModule]  
})
export class DirectorModule {}
