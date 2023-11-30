import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { throwError } from 'rxjs';

@Injectable()

export class PetService {
  
  constructor(@InjectRepository(Pet)
  private readonly petRepository:Repository<Pet>){}

  async createNewPet(createPetDto: PetDto):Promise<Pet> {
    try{
      const { name, specie, sex, age, description, url_img } = createPetDto;
      const newPet: Pet = await this.petRepository.save(new Pet(name, specie, sex, age, url_img, description));
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

  async findAll():Promise<Pet[]> {
    try{
      const pets: Pet[] = await this.petRepository.find();
      if(!pets){
        throw new Error ('Los siento, no encontramos a las mascotas');
      }else{
        return pets;
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Mascotas - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }


  async filterPets(pageNumber: number, specie?: string, sex?:string, location?:number): Promise<PetDto[]>{
    try{
      const elementsPage = 10;
      const skipItems = (pageNumber - 1) * elementsPage;

      const filter = {
        ...(specie? { specie }: {}),
        // ...(location? { fk_city_id: Number(location) } : {}),
        ...(sex? { sex }: {})
      }
      const criterio: FindManyOptions = {
        //relations: ['attributes', 'city'],
        where: { available: false,
        ...filter,
        },
        skip: skipItems
      };
      const leakedPets = await this.petRepository.find(criterio);
      console.log(leakedPets);
      if(!leakedPets){
        throw new Error('Pet capture error.');
      }
      const petData : any = leakedPets.map(pet =>({
        id: pet.id,
        name: pet.name,
        sex: pet.sex,
        age: pet.age,
        specie: pet.specie,
        attributes: [ { attribut: "Desparacitado" } ],
        description: pet.description,
        url_img: pet.url_img,
        interested: pet.interested,
      }));
      return petData;
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Error en Mascotas - ' + error,
      },HttpStatus.BAD_REQUEST);
    }
  }

  async countPets(): Promise<number> {
    try{
      return await this.petRepository.count();
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Mascotas - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: number):Promise<Pet> {
    try{
      const pet: Pet = await this.petRepository.findOne({ where:{id:id} });
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

  async update(id: number, updatePetDto: UpdatePetDto):Promise<Pet> {
    try{
      let pet: Pet = await this.petRepository.findOne({ where:{id: id} });
      if(!pet){
        throw new Error('Lo siento, no encontramos la mascsota que buscas');
      }else{
        if(updatePetDto.name != null || updatePetDto.name!= undefined){
          pet.setName(updatePetDto.name);
          pet = await this.petRepository.save(pet);
        }
        if(updatePetDto.specie != null || updatePetDto.specie != undefined){
          pet.setSpecie(updatePetDto.specie);
          pet = await this.petRepository.save(pet);
        }
        if(updatePetDto.sex != null || updatePetDto.sex != undefined){
          pet.setSex(updatePetDto.sex);
          pet = await this.petRepository.save(pet);
        }
        if(updatePetDto.age != null || updatePetDto.age != undefined){
          pet.setAge(updatePetDto.age);
          pet = await this.petRepository.save(pet);
        }
        if(updatePetDto.url_img != null || updatePetDto.url_img != undefined){
          pet.setUrl_img(updatePetDto.url_img);
          pet = await this.petRepository.save(pet);
        }
        if(updatePetDto.description != null || updatePetDto.description != undefined){
          pet.setDescription(updatePetDto.description);
          pet = await this.petRepository.save(pet);
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
      const pet: Pet = await this.petRepository.findOne({ where:{id:id} });
      if(!pet){
        throw new Error('Lo siento, no se encontró la mascota que desea eliminar');
      }else{
        await this.petRepository.remove(pet);
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
