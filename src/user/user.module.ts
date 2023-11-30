import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { Client } from 'src/client/entities/client.entity';
import { ClientService } from 'src/client/client.service';
import { ClientModule } from 'src/client/client.module';
import { AuthModule } from 'src/auth/auth.module';
import { CityService } from 'src/city/city.service';
import { City } from 'src/city/entities/city.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,City,Client])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
