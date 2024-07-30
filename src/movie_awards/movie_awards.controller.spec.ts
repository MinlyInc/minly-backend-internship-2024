import { Test, TestingModule } from '@nestjs/testing';
import { MovieAwardController } from './movie_awards.controller';
import { MovieAwardService } from './movie_awards.service';

describe('MovieAwardsController', () => {
  let controller: MovieAwardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieAwardController],
      providers: [MovieAwardService],
    }).compile();

    controller = module.get<MovieAwardController>(MovieAwardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
