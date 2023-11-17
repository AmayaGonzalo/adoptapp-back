import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInformationTypeDto } from './dto/create-information_type.dto';
import { UpdateInformationTypeDto } from './dto/update-information_type.dto';
import { InformationType } from './entities/information_type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InformationTypeService {
  constructor(@InjectRepository(InformationType)
  private readonly informationTypeRepository:Repository<InformationType>){}

  async create(createInformationTypeDto: CreateInformationTypeDto) {
    try{
      const { type } = createInformationTypeDto;
      const newType: CreateInformationTypeDto = await this.informationTypeRepository.save(new InformationType(type));
      if(!newType){
        throw new Error('No se ha podido crear el nuevo tipo');
      }else{
        return newType;
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en information_type - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  async findAll() {
    const informationTypeTotal = await this.informationTypeRepository.find();
    return informationTypeTotal;
  }

  async findOne(id: number) {
    try{
      const type: InformationType = await this.informationTypeRepository.findOne({ where:{id:id} });
      if(!type){
        throw new Error('No se ha encontrado ese tipo');
      }else{
        return type;
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en information_type - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updateInformationTypeDto: UpdateInformationTypeDto) {
    try{
      let type: InformationType = await this.informationTypeRepository.findOne({ where:{id: id} });
      if(!type){
        throw new Error('Lo siento, no encontramos el tipo que buscas');
      }else{
        if(updateInformationTypeDto.type != null || updateInformationTypeDto.type != undefined){
          type.setType(updateInformationTypeDto.type);
          type = await this.informationTypeRepository.save(type);
        }
        return type;
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en information_type - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: number) {
    try{
      let type: InformationType = await this.informationTypeRepository.findOne({ where:{id: id} });
      if(!type){
        throw new Error('Lo siento, no se encontró el tipo que desea eliminar');
      }else{
        await this.informationTypeRepository.remove(type);
        return `Se eliminó exitosamente ${type.type}`;
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
