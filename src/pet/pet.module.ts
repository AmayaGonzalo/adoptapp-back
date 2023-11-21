import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { Attribute } from 'src/attribute/entities/attribute.entity';
import { City } from 'src/city/entities/city.entity';
import { Institution } from 'src/institution/entities/institution.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Pet, Attribute, City, Institution])],
  controllers: [PetController],
  providers: [PetService],
})
export class PetModule {}
