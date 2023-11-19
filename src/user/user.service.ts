import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User)
              private readonly userRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto):Promise<User> {
    try {
      const newUser: User = await this.userRepository.save(new User(createUserDto.username, createUserDto.password));
      if(!newUser) {
        throw new Error ('No se pudo crear el usuario')
      } else {
        return newUser
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error al crear usuario - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  async findAll():Promise<User[]> {
    try {
      const allUsers: User[] = await this.userRepository.find();
      if (!allUsers) {
        throw new Error ('No se pudo encontrar usuarios')
      } else {
        return allUsers;
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en findAll() usuarios - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: number):Promise<User> {
    try {
      const usuarioBuscado: User = await this.userRepository.findOne({where: {id:id}});
      if(!usuarioBuscado) {
        throw new Error ('No se pudo encontrar el usuario')
      } else {
        return usuarioBuscado;
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en findOne() usuario - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto):Promise<User> {
    try {
      let usuarioBuscado: User = await this.userRepository.findOne({where: {id:id}})
      if(!usuarioBuscado) {
        throw new Error ('No se pudo encontrar el usuario')
      } else {
        if(updateUserDto.password != null || updateUserDto.password != undefined) {
          usuarioBuscado.setPassword(updateUserDto.password);
          usuarioBuscado = await this.userRepository.save(usuarioBuscado);
        }
        if(updateUserDto.username != null || updateUserDto.username != undefined) {
          usuarioBuscado.setUsername(updateUserDto.username);
          usuarioBuscado = await this.userRepository.save(usuarioBuscado);
        }
        return usuarioBuscado
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error al crear usuario - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: number):Promise<string> {
    try {
      const usuarioBuscado: User = await this.userRepository.findOne({where: {id:id}})
      if(!usuarioBuscado) {
        throw new Error ('No se pudo encontrar el usuario')
      } else {
        await this.userRepository.remove(usuarioBuscado)
        return 'Se elimino exitosamente al usuario ' + usuarioBuscado.getUsername();
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error al eliminar usuario - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }
}
