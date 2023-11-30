import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerDto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { LoginDto } from './dto/loginDto';
import { Role } from 'src/common/enum/role.enum';

import { ClientService } from 'src/client/client.service';
import { Client } from 'src/client/entities/client.entity';
import { ClientDto } from 'src/client/dto/create-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class AuthService {

  constructor(private userService:UserService,
              private clientService:ClientService,
              private jwtService:JwtService,
              @InjectRepository(User)
              private readonly userRepository:Repository<User>

  ){}


  async registerNewUserAndClient(registerDto:RegisterDto):Promise<any>{
    try {      
      const { name, surname, age, areaCode, phoneNumber, address, livingPlace, city, username, password, email,  role } = registerDto;

      const existingUser = await this.userService.findOneByEmail(email);//busca en la DB si el email ingresado
      if(existingUser){    
          throw new BadRequestException('El usuario ya existe');
      }else{
        const newClient : Client = await this.clientService.createNewClient({name,surname,age,email,areaCode,phoneNumber, address, livingPlace,city});        
        if(newClient){
          const pass_encriptada =  await bcrypt.hash(password,10);
          const newUser : User = await this.userService.createNewUser({password:pass_encriptada,email,username,role});
          newUser.client = newClient
          await this.userRepository.save(newUser)       
          console.log(newUser, newClient);
          return newUser;
        }else{
          throw new BadRequestException('Error al crear un usuario nuevo');
        }       
      } 
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en el Registro - ' + error
      },HttpStatus.NOT_FOUND);
    }   
  };


  async login(loginDto:LoginDto){    
    try{
      const { email, password } = loginDto;
      const user = await this.userService.findOneByEmail(email);
      if(!user){
        throw new UnauthorizedException('Usuario incorrecto');
      }else{
        const isPasswaordValid = await bcrypt.compare(password,user.password);  //devuelve un boolean
        if(!isPasswaordValid){
          throw new UnauthorizedException('Password y/o usuario incorrecto');
        }else{
          const payload = { email: user.email, user: user.username, role: user.role};
          const token = await this.jwtService.signAsync(payload);
          return {
            user: {idUser: user.id,                  
                  username: user.username,
                  email: user.email                  
                  },            
            token: token
          };
        }
      }
    }
    catch(error){ 
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en el Login - ' + error
      },HttpStatus.NOT_FOUND);
    }
  };

  // async user(role:Role){
  //   if(role == Role.ADMIN)
  //     return "Bienvenido al perfil Admin";    
  //   if(role == Role.USER)
  //     return "Bienvenido al perfil User";
  //   return "No puedes acceder al perfil sin antes registrarte";    
  // };
}