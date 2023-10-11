import { Module } from '@nestjs/common';
import { AdoptionService } from './adoption.service';
import { AdoptionController } from './adoption.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adoption } from './entities/adoption.entity';
import { Client } from 'src/client/entities/client.entity';
import { City } from 'src/city/entities/city.entity';
import { Pet } from 'src/pet/entities/pet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Adoption,Client,City,Pet])],
  controllers: [AdoptionController],
  providers: [AdoptionService],
})
export class AdoptionModule {}
