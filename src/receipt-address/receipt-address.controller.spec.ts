import { Test, TestingModule } from '@nestjs/testing';
import { ReceiptAddressController } from './receipt-address.controller';

describe('ReceiptAddress Controller', () => {
  let controller: ReceiptAddressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceiptAddressController],
    }).compile();

    controller = module.get<ReceiptAddressController>(ReceiptAddressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
