import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { Repository } from 'typeorm';

@Injectable()

export class PetService {
  
  constructor(@InjectRepository(Pet)
  private readonly petRespository:Repository<Pet>){}

  async createNewPet(createPetDto: PetDto):Promise<PetDto> {
    try{
      const { name, specie, sex, age, description, url_img } = createPetDto;
      const newPet: PetDto = await this.petRespository.save(new Pet(name, specie, sex, age, url_img, description));
      if(!newPet){
        throw new Error('No se ha podido crear la mascota');
      }else{
        return newPet;
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Mascotas - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  async findAll():Promise<PetDto[]> {
    try{
      const Pets: PetDto[] = await this.petRespository.find();
      if(!Pets){
        throw new Error ('Los siento, no encontramos a las mascotas');
      }else{
        return Pets;
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Mascotas - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: number):Promise<PetDto> {
    try{
      const pet: PetDto = await this.petRespository.findOne({ where:{id:id} });
      if(!pet){
        throw new Error('No se ha encontrado esa mascota');
      }else{
        return pet;
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Mascotas - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updatePetDto: UpdatePetDto):Promise<PetDto> {
    try{
      let pet: Pet = await this.petRespository.findOne({ where:{id: id} });
      if(!pet){
        throw new Error('Lo siento, no encontramos la mascsota que buscas');
      }else{
        if(updatePetDto.name != null || updatePetDto.name!= undefined){
          pet.setName(updatePetDto.name);
          pet = await this.petRespository.save(pet);
        }
        if(updatePetDto.specie != null || updatePetDto.specie != undefined){
          pet.setSpecie(updatePetDto.specie);
          pet = await this.petRespository.save(pet);
        }
        if(updatePetDto.sex != null || updatePetDto.sex != undefined){
          pet.setSex(updatePetDto.sex);
          pet = await this.petRespository.save(pet);
        }
        if(updatePetDto.age != null || updatePetDto.age != undefined){
          pet.setAge(updatePetDto.age);
          pet = await this.petRespository.save(pet);
        }
        if(updatePetDto.url_img != null || updatePetDto.url_img != undefined){
          pet.setUrl_img(updatePetDto.url_img);
          pet = await this.petRespository.save(pet);
        }
        if(updatePetDto.description != null || updatePetDto.description != undefined){
          pet.setDescription(updatePetDto.description);
          pet = await this.petRespository.save(pet);
          return pet;
        }
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Mascotas - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: number):Promise<string> {
    try{
      const pet: Pet = await this.petRespository.findOne({ where:{id:id} });
      if(!pet){
        throw new Error('Lo siento, no se encontró la mascota que desea eliminar');
      }else{
        await this.petRespository.remove(pet);
        return `Se eliminó exitosamente ${pet.name}`;
      }    
    } 
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Mascotas - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }
}
