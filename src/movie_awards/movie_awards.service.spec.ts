import { Test, TestingModule } from '@nestjs/testing';
import { MovieAwardService } from './movie_awards.service';

describe('MovieAwardsService', () => {
  let service: MovieAwardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieAwardService],
    }).compile();

    service = module.get<MovieAwardService>(MovieAwardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
