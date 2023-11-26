import { Module } from '@nestjs/common';
import { InformationService } from './information.service';
import { InformationController } from './information.controller';
import { Information } from './entities/information.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from 'src/city/entities/city.entity';
import { InformationType } from 'src/information_type/entities/information_type.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Information, City, InformationType])],
  controllers: [InformationController],
  providers: [InformationService],
})
export class InformationModule {}
