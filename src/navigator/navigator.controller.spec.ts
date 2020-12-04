import { Test, TestingModule } from '@nestjs/testing';
import { NavigatorController } from './navigator.controller';

describe('Navigator Controller', () => {
  let controller: NavigatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NavigatorController],
    }).compile();

    controller = module.get<NavigatorController>(NavigatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
