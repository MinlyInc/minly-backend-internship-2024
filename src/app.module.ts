import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { MovieModule } from './movie/movie.module';
import typeorm from './config/typeorm';
import { MovieController } from './movie/movie.controller';
import { MovieService } from './movie/movie.service';
import { DirectorModule } from './director/director.module';
import { RouterModule } from '@nestjs/core';
import { ActorModule } from './actor/actor.module';
import { WriterModule } from './writer/writer.module';

@Module({
  imports: [


    ConfigModule.forRoot({ isGlobal: true, load: [typeorm] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
MovieModule,
    // RouterModule.register([
    //   {
    //     path: 'movie',
    //     module: MovieModule,
    //     children:[
    //       {
    //         path:'movie/:id'
    //       }
    //     ]
    //   },
    // ]),
    
    HealthModule,
    DirectorModule,
    MovieModule,
    ActorModule,
    WriterModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
