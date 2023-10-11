import { Test, TestingModule } from '@nestjs/testing';
import { ComplaintTypeController } from './complaint_type.controller';
import { ComplaintTypeService } from './complaint_type.service';

describe('ComplaintTypeController', () => {
  let controller: ComplaintTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComplaintTypeController],
      providers: [ComplaintTypeService],
    }).compile();

    controller = module.get<ComplaintTypeController>(ComplaintTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
