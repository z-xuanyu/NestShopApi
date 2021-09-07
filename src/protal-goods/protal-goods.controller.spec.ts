import { Test, TestingModule } from '@nestjs/testing';
import { ProtalGoodsController } from './protal-goods.controller';

describe('ProtalGoods Controller', () => {
  let controller: ProtalGoodsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProtalGoodsController],
    }).compile();

    controller = module.get<ProtalGoodsController>(ProtalGoodsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
