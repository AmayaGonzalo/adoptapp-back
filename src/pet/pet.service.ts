import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()

export class PetService {
  
  constructor(@InjectRepository(Pet)
  private readonly petRepository:Repository<Pet>){}

  async createNewPet(createPetDto: PetDto):Promise<PetDto> {
    try{
      const { name, specie, sex, age, description, url_img  } = createPetDto;
      const newPet: PetDto = await this.petRepository.save(new Pet(name, specie, sex, age, description, url_img));
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

  // async findAll():Promise<PetDto[]> {
  //   try{
  //     const Pets: PetDto[] = await this.petRespository.find();
  //     if(!Pets){
  //       throw new Error ('Los siento, no encontramos a las mascotas');
  //     }else{
  //       return Pets;
  //     }
  //   }
  //   catch(error){
  //     throw new HttpException({
  //       status: HttpStatus.CONFLICT,
  //       error: 'Error en Mascotas - ' + error
  //     },HttpStatus.NOT_FOUND);
  //   }
  // }


  //falta paginar las consultas
  async filterPet(pageNumber, specie?, sex?, location?):Promise<PetDto[]> {
    let filter = {specie,sex,location};
    let skipVar = Number((Number(pageNumber) - 1) * 10);
    let takeVar = 10;
    let Pets: any;
    //let query = { take: takeVar, skip: Number(skipVar) };
    try{
      if(filter){
        Pets = await this.petRepository.find(
          { where:
            {
              specie:specie,
              sex:sex
            },
            // skip: Number(skipVar),
            // take: takeVar
          });
      } else {
        Pets = await this.petRepository.find()
      }

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

  async filterPets(pageNumber: number, specie?: string, location_id?: number, sex?: string): Promise<PetDto[]> {

    try {
      const elementsPage = 10;
      const skipItems = (pageNumber - 1) * elementsPage;

      const filter = {
        ...(specie ? { specie } : {}),
        //...(location_id ? { fk_city_id: Number(location_id) } : {}),
        ...(sex ? { sex } : {})
      }
      const criterion: FindManyOptions = {
      //  relations: ['attributes', 'city'],
        take: elementsPage,
        where: {
          available: false,
          ...filter,
        },
        skip: skipItems
      };
      const leakedPets = await this.petRepository.find(criterion);
      console.log(leakedPets);

      if (!leakedPets) {
        throw new Error('Pet capture error.');
      }
      const petData: any = leakedPets.map(pet => ({
        id: pet.id,
        name: pet.name,
        sex: pet.sex,
        age: pet.age,
        specie: pet.specie,
        attributes : [ { attribut : "Desparacitado"}],
        description: pet.description,
        urlImg: pet.url_img,
        interested: pet.interested,
      }));
      return petData;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: `Pet capture error -` + error.message,
      },
        HttpStatus.BAD_REQUEST);
    }
  }

  async countPets(): Promise<number> {
    try {
      return await this.petRepository.count();
    }
    catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: `Error when counting pets -` + error.message,
      },
        HttpStatus.BAD_REQUEST);
    }
  };

//   async findOne(id: number):Promise<PetDto> {
//     try{
//       const pet: PetDto = await this.petRespository.findOne({ where:{id:id} });
//       if(!pet){
//         throw new Error('No se ha encontrado esa mascota');
//       }else{
//         return pet;
//       }
//     }
//     catch(error){
//       throw new HttpException({
//         status: HttpStatus.CONFLICT,
//         error: 'Error en Mascotas - ' + error
//       },HttpStatus.NOT_FOUND);
//     }
//   }

//   async update(id: number, updatePetDto: UpdatePetDto):Promise<PetDto> {
//     try{
//       let pet: Pet = await this.petRespository.findOne({ where:{id: id} });
//       if(!pet){
//         throw new Error('Lo siento, no encontramos la mascsota que buscas');
//       }else{
//         if(updatePetDto.name != null || updatePetDto.name!= undefined){
//           pet.setName(updatePetDto.name);
//           pet = await this.petRespository.save(pet);
//         }
//         if(updatePetDto.specie != null || updatePetDto.specie != undefined){
//           pet.setSpecie(updatePetDto.specie);
//           pet = await this.petRespository.save(pet);
//         }
//         if(updatePetDto.sex != null || updatePetDto.sex != undefined){
//           pet.setSex(updatePetDto.sex);
//           pet = await this.petRespository.save(pet);
//         }
//         if(updatePetDto.age != null || updatePetDto.age != undefined){
//           pet.setAge(updatePetDto.age);
//           pet = await this.petRespository.save(pet);
//         }
//         if(updatePetDto.url_img != null || updatePetDto.url_img != undefined){
//           pet.setUrl_img(updatePetDto.url_img);
//           pet = await this.petRespository.save(pet);
//         }
//         if(updatePetDto.description != null || updatePetDto.description != undefined){
//           pet.setDescription(updatePetDto.description);
//           pet = await this.petRespository.save(pet);
//           return pet;
//         }
//       }
//     }
//     catch(error){
//       throw new HttpException({
//         status: HttpStatus.CONFLICT,
//         error: 'Error en Mascotas - ' + error
//       },HttpStatus.NOT_FOUND);
//     }
//   }

//   async remove(id: number):Promise<string> {
//     try{
//       const pet: Pet = await this.petRespository.findOne({ where:{id:id} });
//       if(!pet){
//         throw new Error('Lo siento, no se encontró la mascota que desea eliminar');
//       }else{
//         await this.petRespository.remove(pet);
//         return `Se eliminó exitosamente ${pet.name}`;
//       }    
//     } 
//     catch(error){
//       throw new HttpException({
//         status: HttpStatus.CONFLICT,
//         error: 'Error en Mascotas - ' + error
//       },HttpStatus.NOT_FOUND);
//     }
//   }
  }
