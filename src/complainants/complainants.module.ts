import { Module } from '@nestjs/common';
import { ComplainantsService } from './complainants.service';
import { ComplainantsController } from './complainants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Complainant } from './entities/complainant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Complainant])],
  controllers: [ComplainantsController],
  providers: [ComplainantsService],
})
export class ComplainantsModule {}
