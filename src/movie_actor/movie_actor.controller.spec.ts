import { Test, TestingModule } from '@nestjs/testing';
import { MovieActorController } from './movie_actor.controller';
import { MovieActorService } from './movie_actor.service';

describe('MovieActorController', () => {
  let controller: MovieActorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieActorController],
      providers: [MovieActorService],
    }).compile();

    controller = module.get<MovieActorController>(MovieActorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
