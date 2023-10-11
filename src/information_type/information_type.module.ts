import { Module } from '@nestjs/common';
import { InformationTypeService } from './information_type.service';
import { InformationTypeController } from './information_type.controller';

@Module({
  controllers: [InformationTypeController],
  providers: [InformationTypeService],
})
export class InformationTypeModule {}
