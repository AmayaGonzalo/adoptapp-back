import { Module } from '@nestjs/common';
import { InformationTypeService } from './information_type.service';
import { InformationTypeController } from './information_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InformationType } from './entities/information_type.entity';

@Module({
  imports:[TypeOrmModule.forFeature([InformationType])],
  controllers: [InformationTypeController],
  providers: [InformationTypeService],
})
export class InformationTypeModule {}
