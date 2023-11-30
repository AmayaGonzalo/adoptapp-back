import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { ClientService } from 'src/client/client.service';
import { ClientModule } from 'src/client/client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { City } from 'src/city/entities/city.entity';
import { Client } from 'src/client/entities/client.entity';
import { CityModule } from 'src/city/city.module';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User,City,Client]),
    JwtModule.register({
      global: true,
      secret: "LA PALABRA SECRETA O EL SECRETO ES UNA PALABRA SECRETAMENTE SECRETA",
      signOptions: {expiresIn: "1d"}
    }),
    UserModule
   
  ], 
  controllers: [AuthController],
  providers: [AuthService, UserService, ClientService],
  exports: [AuthService]
})
export class AuthModule {}
