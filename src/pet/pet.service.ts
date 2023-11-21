import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { City } from 'src/city/entities/city.entity';
import { Attribute } from 'src/attribute/entities/attribute.entity';
import { Institution } from 'src/institution/entities/institution.entity';

@Injectable()

export class PetService {
  
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository:Repository<Pet>,
    @InjectRepository(City)
    private cityRepository: Repository<City>,
    @InjectRepository(Attribute)
    private readonly attributRepository: Repository<Attribute>,
    @InjectRepository(Institution)
    private readonly institutionRepository: Repository<Institution>
  ){}

  async findAll(): Promise<Pet[]> {
    const petsTotal = await this.petRepository.find();
    return petsTotal;
  }

  async createNewPet(createPetDto: CreatePetDto):Promise<string> {
    try{
      let newPet: Pet = await this.confirmValues(createPetDto)
      newPet = await this.petRepository.save(newPet);
      if(!newPet){
        throw new Error('No se ha podido crear la mascota');
      }else{
                return newPet.name;
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Mascotas - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  private async confirmValues(createPetDto: CreatePetDto):Promise<Pet> {
    const { name, specie, sex, age, description, url_img, attributes, institution_id} = createPetDto;
    const newPet: Pet = new Pet(name, specie, sex, age, url_img, description);
    const institutionId = await this.checkInsitution(institution_id);
    if (institutionId === null) {
      // Manejar la situación en la que la institución no existe
      throw new Error('La institución no existe');
    }
    //newPet.attributes = await this.handleAttributes(attributes);
    newPet.attributes = await this.attributesCheck(newPet, attributes);
    console.log(attributes);
    console.log(newPet);
    newPet.fk_institution_id = institutionId;
    return newPet;
  }

  private async checkInsitution(institution_id: number):Promise<number> {
    const criterion: FindOneOptions = { where: { institution_id: institution_id } };
    const institution = await this.institutionRepository.findOne(criterion);
    if (!institution) {
      return null;
    } else {
      return institution.id;
    }
  }
    


  private async existAttribute(myAttribute: Attribute): Promise<boolean> {
    try {
      let attributeName: string = myAttribute.toString();
      attributeName.toLowerCase()
      myAttribute = await this.attributRepository.findOne({ where: { name: attributeName.toLowerCase() } });
      if (myAttribute === null) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error('Error in existAttribute:', error); // Imprime el error en la consola para depuración
      throw new Error('No se pudo buscar el atributo');
    }
  }
  

  private async attributesCheck(myPet: Pet, myAttributes: Attribute[]):Promise<Attribute[]> {
    if (myAttributes.length === 0) {
      throw new Error(`Enter an attribute for the pet.`);
    }
    try {
      myPet.attributes = [];
      for (let index = 0; index < myAttributes.length; index++) {
        //existe? SI NO
          //SI
            //asignar
          //NO
            //crear, asignar
        if(await this.existAttribute(myAttributes[index]) === true) {
          myPet.attributes.push(myAttributes[index])
        } else {
          console.log(myAttributes[index] + "no existe");
          const newAttribute: string = myAttributes[index].toString().toLowerCase();
          await this.attributRepository.save(new Attribute(newAttribute))
          myPet.attributes.push(myAttributes[index])
        }        
      }
      return myPet.attributes;
    }
    catch(error) {
      throw new Error('no se pudo asignar '+ error)
    }
  } 

  
  
  

  async filterPets(pageNumber: number, specie?: string, location_id?: number, sex?: string): Promise<CreatePetDto[]> {

      try {
        const elementsPage = 10;
        const skipItems = (pageNumber - 1) * elementsPage;

        const filter = {
          ...(specie ? { specie } : {}),
          //...(location_id ? { fk_city_id: Number(location_id) } : {}),
          //...(location_id ? { institution : { fk_city_id : location_id }} : {}),
          ...(sex ? { sex } : {})
        }
        const criterion: FindManyOptions = {
          relations: ['attributes', 'institution'],
          take: elementsPage,
          where: {
            available: false,
            ...filter,
          },
          skip: skipItems
        };


        

        const leakedPets = await this.petRepository.find(criterion);

        if (!leakedPets) {
          throw new Error('Pet capture error.');
        }
        const petData: any = leakedPets.map(pet => ({
          id: pet.id,
          name: pet.name,
          sex: pet.sex,
          age: pet.age,
          specie: pet.specie,
          //attributes : [ { attributes : "a"}],
          attributes : pet.attributes.map(attribute => (attribute.name)),  
          description: pet.description,
          url_img: pet.url_img,
          interested: pet.interested,
          institution : pet.institution.name
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
          }
          if(updatePetDto.attributes != null || updatePetDto.attributes != undefined){
            pet.setAttributes(updatePetDto.attributes);
            pet = await this.petRepository.save(pet);
          }
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
