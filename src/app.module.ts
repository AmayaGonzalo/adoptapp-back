import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetModule } from './pet/pet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeModule } from './attribute/attribute.module';
import { CityModule } from './city/city.module';
import { AdoptionModule } from './adoption/adoption.module';
import { ClientModule } from './client/client.module';
import { ComplainantsModule } from './complainants/complainants.module';
import { ComplaintModule } from './complaint/complaint.module';
import { ComplaintTypeModule } from './complaint_type/complaint_type.module';
import { InformationModule } from './information/information.module';
import { InformationTypeModule } from './information_type/information_type.module';
import { UserModule } from './user/user.module';
import { InstitutionModule } from './institution/institution.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    "type": "mysql",
    "host":"localhost",
    "port": 3306,
    "username":"root",
    "password":"12345",
    "database": "adopt_app",
    "entities": [__dirname + "/**/**/**.entity{.ts,.js}"],
    "synchronize": true
  }),
  PetModule,
  AttributeModule,
  CityModule,
  AdoptionModule,
  ClientModule,
  ComplainantsModule,
  ComplaintModule,
  ComplaintTypeModule,
  InformationModule,
  InformationTypeModule,
  UserModule,
  InstitutionModule
  ],  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}