import { Test, TestingModule } from '@nestjs/testing';
import { ProtalHomeController } from './protal-home.controller';

describe('ProtalHome Controller', () => {
  let controller: ProtalHomeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProtalHomeController],
    }).compile();

    controller = module.get<ProtalHomeController>(ProtalHomeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
