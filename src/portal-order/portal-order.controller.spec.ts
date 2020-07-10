import { Test, TestingModule } from '@nestjs/testing';
import { PortalOrderController } from './portal-order.controller';

describe('PortalOrder Controller', () => {
  let controller: PortalOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortalOrderController],
    }).compile();

    controller = module.get<PortalOrderController>(PortalOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
