import { Module } from '@nestjs/common';
import { ComplaintTypeService } from './complaint_type.service';
import { ComplaintTypeController } from './complaint_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComplaintTypeDTO } from './entities/complaint_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ComplaintTypeDTO])],
  controllers: [ComplaintTypeController],
  providers: [ComplaintTypeService],
})
export class ComplaintTypeModule {}
