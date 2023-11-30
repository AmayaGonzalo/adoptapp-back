import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { City } from 'src/city/entities/city.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Client,City,User])],
  controllers: [ClientController],
  providers: [ClientService,UserService],
  exports: [ClientService]
})
export class ClientModule {}
