import { Test, TestingModule } from '@nestjs/testing';
import { ReceiptAddressService } from './receipt-address.service';

describe('ReceiptAddressService', () => {
  let service: ReceiptAddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceiptAddressService],
    }).compile();

    service = module.get<ReceiptAddressService>(ReceiptAddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
