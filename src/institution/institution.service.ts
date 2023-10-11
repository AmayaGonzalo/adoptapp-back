import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Institution } from './entities/institution.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InstitutionService {

  constructor(@InjectRepository(Institution)
              private readonly institutionRepository:Repository<Institution>
              ){}

  async create(institutionDto: InstitutionDto):Promise<InstitutionDto> {
    try {
      const { name, address } = institutionDto;
      const newInstitution : Institution = await this.institutionRepository.save(new Institution(name,address));
      if(!newInstitution){
        throw new Error('No se pudo crear la nueva institución')
      }else{
        return newInstitution;
      }
    } 
    catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en adopción - ' + error

      },HttpStatus.NOT_FOUND);
    }  
  }

  findAll() {
    return `This action returns all institution`;
  }

  findOne(id: number) {
    return `This action returns a #${id} institution`;
  }

  update(id: number, updateInstitutionDto: UpdateInstitutionDto) {
    return `This action updates a #${id} institution`;
  }

  remove(id: number) {
    return `This action removes a #${id} institution`;
  }
}
