import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/common/enum/role.enum';
import { ClientService } from 'src/client/client.service';
import { CityService } from 'src/city/city.service';
import { City } from 'src/city/entities/city.entity';
import { CityDto } from 'src/city/dto/create-city.dto';
import { Client } from 'src/client/entities/client.entity';
// import { Role } from 'src/common/enum/role.enum';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User)
              private readonly userRepository:Repository<User>,
              @InjectRepository(City)
              private readonly cityRepository:Repository<City>,
              @InjectRepository(Client)
              private readonly clienService:Repository<Client>
  ){}

  async createNewUser(createUserDto: CreateUserDto):Promise<User> {
    try{    
      const { password, email, username, role } = createUserDto;
      const newUser : User = await this.userRepository.save(new User(password, email, username, role));
      return newUser;
    }catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en User - ' + error
      },HttpStatus.NOT_FOUND);
    }
  };

  async findOneByEmail(email:string): Promise<User>{
    return await this.userRepository.findOne({where:{email},relations:['client']});
  };


  async user(role:Role){
    if(role == Role.ADMIN)
      return "Bienvenido al perfil Admin";    
    if(role == Role.USER)
      return "Bienvenido al perfil User";
    return "No puedes acceder al perfil sin antes registrarte";    
  };


  async getDataPersonal({email,rol}:{email:string, rol:string}):Promise<any>{
    try{     
        const dataUser = await this.findOneByEmail(email);
        const client: Client = await this.clienService.findOne({ where:{id:dataUser.client.id},relations:['city']});

       
        
        return {
          user: {idUser: dataUser.id,                  
                username: dataUser.username,
                email: dataUser.email                  
                },
          client:{
                idClient: dataUser.client.id,
                name: dataUser.client.name,
                surname: dataUser.client.surname,
                areaCode: dataUser.client.areaCode,
                phoneNumber: dataUser.client.phoneNumber,
                age: dataUser.client.age,
                address: dataUser.client.address,
                livingPlace: dataUser.client.livingPlace,
                city :dataUser.client.city,
                haspet: dataUser.client.hasPet
              },
          city: client.city.name
        }     
      }
      catch(error){
        throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en User - ' + error
        },HttpStatus.NOT_FOUND);
      }
    };
  }



  // findAll() {
  //   return `This action returns all user`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
