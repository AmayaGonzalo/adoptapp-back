import { Module } from '@nestjs/common';
import { InstitutionService } from './institution.service';
import { InstitutionController } from './institution.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institution } from './entities/institution.entity';
import { Pet } from 'src/pet/entities/pet.entity';
import { City } from 'src/city/entities/city.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Institution, Pet, City])],
  controllers: [InstitutionController],
  providers: [InstitutionService],
})
export class InstitutionModule {}
