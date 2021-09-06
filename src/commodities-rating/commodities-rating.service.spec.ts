import { Test, TestingModule } from '@nestjs/testing';
import { CommoditiesRatingService } from './commodities-rating.service';

describe('CommoditiesRatingService', () => {
  let service: CommoditiesRatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommoditiesRatingService],
    }).compile();

    service = module.get<CommoditiesRatingService>(CommoditiesRatingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
