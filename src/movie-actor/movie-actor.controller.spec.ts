import { Test, TestingModule } from '@nestjs/testing';
import { MovieActorController } from './movie-actor.controller';

describe('MovieActorController', () => {
  let controller: MovieActorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieActorController],
    }).compile();

    controller = module.get<MovieActorController>(MovieActorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
