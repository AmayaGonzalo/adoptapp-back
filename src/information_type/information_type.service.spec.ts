import { Test, TestingModule } from '@nestjs/testing';
import { InformationTypeService } from './information_type.service';

describe('InformationTypeService', () => {
  let service: InformationTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InformationTypeService],
    }).compile();

    service = module.get<InformationTypeService>(InformationTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
