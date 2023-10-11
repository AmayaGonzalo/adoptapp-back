import { Test, TestingModule } from '@nestjs/testing';
import { ComplainantsService } from './complainants.service';

describe('ComplainantsService', () => {
  let service: ComplainantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComplainantsService],
    }).compile();

    service = module.get<ComplainantsService>(ComplainantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
