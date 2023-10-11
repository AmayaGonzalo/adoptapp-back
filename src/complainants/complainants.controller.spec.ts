import { Test, TestingModule } from '@nestjs/testing';
import { ComplainantsController } from './complainants.controller';
import { ComplainantsService } from './complainants.service';

describe('ComplainantsController', () => {
  let controller: ComplainantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComplainantsController],
      providers: [ComplainantsService],
    }).compile();

    controller = module.get<ComplainantsController>(ComplainantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
