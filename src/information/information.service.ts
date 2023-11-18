import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInformationDto } from './dto/create-information.dto';
import { UpdateInformationDto } from './dto/update-information.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Information } from './entities/information.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InformationService {

  constructor(@InjectRepository(Information)
              private readonly informationRepository: Repository<Information>){}

  async create(createInformationDto: CreateInformationDto):Promise<CreateInformationDto> {
    try {
      const newInformation: CreateInformationDto = await this.informationRepository.save(new Information(createInformationDto.informationUrl, createInformationDto.imgUrl));
      if(!newInformation) {
        throw new Error ('No se pudo crear el information')
      } else {
        return newInformation;
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Information - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  async findAll():Promise<Information[]> {
    try {
      const allInfo: Information[] = await this.informationRepository.find();
      if(!allInfo) {
        throw new Error ('No se recupero el array Info')
      } else {
        return allInfo;
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Information - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: number):Promise<Information> {
    try {
      const infoById: Information = await this.informationRepository.findOne({ where: {id:id}});
      if(!infoById) {
        throw new Error ('No se recupero la info')
      } else {
        return infoById;
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Information - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updateInformationDto: UpdateInformationDto):Promise<Information> {
    try {
      let infoById: Information = await this.informationRepository.findOne({ where: {id:id}});
      if(!infoById) {
        throw new Error ('No se recupero la info')
      } else {
        if(updateInformationDto.imgUrl != null || updateInformationDto.imgUrl != undefined) {
          infoById.setImgUrl(updateInformationDto.imgUrl)
          await this.informationRepository.save(infoById);
        }
      
        if(updateInformationDto.informationUrl != null || updateInformationDto.informationUrl != undefined) {
          infoById.setInformationUrl(updateInformationDto.informationUrl)
          await this.informationRepository.save(infoById);
        }

        return infoById;
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en update Information - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: number):Promise<string> {
    try {
      let infoById: Information = await this.informationRepository.findOne({ where: {id:id}});
      if(!infoById) {
        throw new Error ('No se encontro la info')
      } else {
        await this.informationRepository.remove(infoById);
        return 'Eliminado exitosamente registro info ' + infoById.imgUrl;
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en eliminar Information - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }
}
