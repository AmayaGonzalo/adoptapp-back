import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Institution } from './entities/institution.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InstitutionService {

  constructor(@InjectRepository(Institution)
              private readonly institutionRepository:Repository<Institution>
              ){}

  async create(institutionDto: Institution):Promise<CreateInstitutionDto> {
    try {
      const { name, address } = institutionDto;
      const newInstitution : CreateInstitutionDto = await this.institutionRepository.save(new Institution(name,address));
      if(!newInstitution){
        throw new Error('No se pudo crear la nueva institución')
      }else{
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
