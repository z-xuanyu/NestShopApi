import { Test, TestingModule } from '@nestjs/testing';
import { CommoditiesRatingController } from './commodities-rating.controller';

describe('CommoditiesRating Controller', () => {
  let controller: CommoditiesRatingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommoditiesRatingController],
    }).compile();

    controller = module.get<CommoditiesRatingController>(CommoditiesRatingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
