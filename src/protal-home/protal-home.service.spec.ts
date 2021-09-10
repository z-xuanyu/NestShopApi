import { Test, TestingModule } from '@nestjs/testing';
import { ProtalHomeService } from './protal-home.service';

describe('ProtalHomeService', () => {
  let service: ProtalHomeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProtalHomeService],
    }).compile();

    service = module.get<ProtalHomeService>(ProtalHomeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
