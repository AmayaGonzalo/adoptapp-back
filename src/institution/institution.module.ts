import { Module } from '@nestjs/common';
import { InstitutionService } from './institution.service';
import { InstitutionController } from './institution.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstitutionDTO } from './entities/institution.entity';

@Module({
  imports:[TypeOrmModule.forFeature([InstitutionDTO])],
  controllers: [InstitutionController],
  providers: [InstitutionService],
})
export class InstitutionModule {}
