import { Test, TestingModule } from '@nestjs/testing';
import { ProtalGoodsService } from './protal-goods.service';

describe('ProtalGoodsService', () => {
  let service: ProtalGoodsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProtalGoodsService],
    }).compile();

    service = module.get<ProtalGoodsService>(ProtalGoodsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
