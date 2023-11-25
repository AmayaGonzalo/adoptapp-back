import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Institution } from './entities/institution.entity';
import { Repository } from 'typeorm';
import { Pet } from 'src/pet/entities/pet.entity';
import { City } from 'src/city/entities/city.entity';

@Injectable()
export class InstitutionService {

  constructor(@InjectRepository(Pet)
              private readonly petRepository:Repository<Pet>,
              @InjectRepository(Institution)
              private readonly institutionRepository:Repository<Institution>,
              @InjectRepository(City)
              private readonly cityRepository:Repository<City>
              ){}

  async create(institutionDto: CreateInstitutionDto):Promise<Institution> {
    try {
      const { name, address } = institutionDto;
      const cityID: City = await this.checkCity(institutionDto.cityID);
      if(!cityID || !name || !address){
        throw new Error('Los parametros para crear institución no son correctos')
      }else{
        const newInstitution : Institution = new Institution(name, address);
        newInstitution.city = cityID;
        await this.institutionRepository.save(newInstitution);
        return newInstitution;
      }
    } 
    catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en institucion - ' + error

      },HttpStatus.NOT_FOUND);
    }  
  }

  private async checkCity(cityId):Promise<City> {
    const encontrarCiudad: City = await this.cityRepository.findOne({where: {id:cityId}});
    if(!encontrarCiudad) {
      throw new Error('No se encontro la ciudad')
    } else {
      return encontrarCiudad;
    }
  } 

  async findAll():Promise<Institution[]> {
    const institutionTotal = await this.institutionRepository.find();
    return institutionTotal;
  }

  async findOne(id: number):Promise<Institution> {
    try{
      const type: Institution = await this.institutionRepository.findOne({ where:{id:id} });
      if(!type){
        throw new Error('No se ha encontrado esta institucion');
      }else{
        return type;
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en institucion - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  async buscar(id: number):Promise<Pet[]> {
    try{
      const type: Institution = await this.institutionRepository.findOne({ where:{id:id} });
      if(!type){
        throw new Error('No se ha encontrado esta institucion');
      }else{
        const mascotas: Pet[] = await this.petRepository.find({where: {fk_institution_id: type.id}})
        return mascotas;
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en institucion - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updateInstitutionDto: UpdateInstitutionDto):Promise<Institution> {
    try{
      let institution: Institution = await this.institutionRepository.findOne({ where:{id: id} });
      if(!institution){
        throw new Error('Lo siento, no encontramos el tipo que buscas');
      }else{
        if(updateInstitutionDto.name != null || updateInstitutionDto.name != undefined){
          institution.setName(updateInstitutionDto.name);
          institution = await this.institutionRepository.save(institution);
        }
        if(updateInstitutionDto.address != null || updateInstitutionDto.address != undefined){
          institution.setAddress(updateInstitutionDto.address);
          institution = await this.institutionRepository.save(institution);
        }
        if(updateInstitutionDto.cityID != null || updateInstitutionDto.cityID != undefined){
          //comprobacion existencia city o referencia city;
          const cityObject: City = await this.checkCity(updateInstitutionDto.cityID);
          if (cityObject) {
            institution.setCity(cityObject);
            institution = await this.institutionRepository.save(institution);
          }
        }
        return institution;
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en information_type - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: number):Promise<string> {
    try{
      let institution: Institution = await this.institutionRepository.findOne({ where:{id: id} });
      if(!institution){
        throw new Error('Lo siento, no se encontró el tipo que desea eliminar');
      }else{
        await this.institutionRepository.remove(institution);
        return `Se eliminó exitosamente ${institution.name}`;
      }    
    } 
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en information_type - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }
}
