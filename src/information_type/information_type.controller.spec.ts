import { Test, TestingModule } from '@nestjs/testing';
import { InformationTypeController } from './information_type.controller';
import { InformationTypeService } from './information_type.service';

describe('InformationTypeController', () => {
  let controller: InformationTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InformationTypeController],
      providers: [InformationTypeService],
    }).compile();

    controller = module.get<InformationTypeController>(InformationTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
