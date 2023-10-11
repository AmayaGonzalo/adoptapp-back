import { Module } from '@nestjs/common';
import { ComplainantsService } from './complainants.service';
import { ComplainantsController } from './complainants.controller';

@Module({
  controllers: [ComplainantsController],
  providers: [ComplainantsService],
})
export class ComplainantsModule {}
