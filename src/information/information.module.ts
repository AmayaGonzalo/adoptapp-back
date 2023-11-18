import { Module } from '@nestjs/common';
import { InformationService } from './information.service';
import { InformationController } from './information.controller';
import { Information } from './entities/information.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Information])],
  controllers: [InformationController],
  providers: [InformationService],
})
export class InformationModule {}
