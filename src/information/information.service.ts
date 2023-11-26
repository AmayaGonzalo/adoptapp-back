import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInformationDto } from './dto/create-information.dto';
import { UpdateInformationDto } from './dto/update-information.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Information } from './entities/information.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { City } from 'src/city/entities/city.entity';
import { InformationType } from 'src/information_type/entities/information_type.entity';

@Injectable()
export class InformationService {

  constructor(@InjectRepository(Information)
              private readonly informationRepository: Repository<Information>,
              @InjectRepository(City)
              private readonly cityRepository:Repository<City>,
              @InjectRepository(InformationType)
              private readonly infoTypeRepository:Repository<InformationType>
              ){}

  async create(createInformationDto: CreateInformationDto):Promise<Information> {
    try {
      // const newInformation: Information = await this.informationRepository.save(new Information(createInformationDto.informationUrl, createInformationDto.imgUrl));
      const {imageUrlBody, imageUrlTitle, title, descriptionUrl, cityId, informationTypeId} = createInformationDto;
      const newInformation: Information = new Information(imageUrlTitle, title, descriptionUrl, imageUrlBody);
      newInformation.city = await this.checkCity(cityId);
      newInformation.information_type = await this.checkInfoType(informationTypeId)
      if(!newInformation) {
        throw new Error ('No se pudo crear el information')
      } else {
        await this.informationRepository.save(newInformation);
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

  private async checkCity(cityId: number):Promise<City> {
    const encontrarCiudad: City = await this.cityRepository.findOne({where: {id:cityId}});
    if(!encontrarCiudad) {
      throw new Error('No se encontro la ciudad')
    } else {
      return encontrarCiudad;
    }
  } 

  private async checkInfoType(infoTypeId: number):Promise<InformationType> {
    const encontrarInfoType: InformationType = await this.infoTypeRepository.findOne({where: {id:infoTypeId}});
    if(!encontrarInfoType) {
      throw new Error('No se encontro la ciudad')
    } else {
      return encontrarInfoType;
    }
  } 

  //solo pagina las consultas, pero podria añadirse filtros por ciudad y por tipo de info.
  async findAll(pageNumber: number):Promise<Information[]> {
    try {
      const elementsPage: number = 8;
      const skipItems: number = (pageNumber - 1) * elementsPage;
      const criterion: FindManyOptions = {
        take: elementsPage,
        skip: skipItems
      }
      const allInfo: Information[] = await this.informationRepository.find(criterion);
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
        if(updateInformationDto.imageUrlTitle != null || updateInformationDto.imageUrlTitle != undefined) {
          infoById.setImgUrlTitle(updateInformationDto.imageUrlTitle)
          await this.informationRepository.save(infoById);
        }
        
        if(updateInformationDto.imageUrlBody != null || updateInformationDto.imageUrlBody != undefined) {
          infoById.setImgUrlBody(updateInformationDto.imageUrlBody)
          await this.informationRepository.save(infoById);
        }
      
        if(updateInformationDto.title != null || updateInformationDto.title != undefined) {
          infoById.setTitle(updateInformationDto.title)
          await this.informationRepository.save(infoById);
        }

        if(updateInformationDto.descriptionUrl != null || updateInformationDto.descriptionUrl != undefined) {
          infoById.setDescriptionUrl(updateInformationDto.descriptionUrl)
          await this.informationRepository.save(infoById);
        }

        if(updateInformationDto.cityId != null || updateInformationDto.cityId != undefined) {
          const city: City = await this.checkCity(updateInformationDto.cityId)
          if(city) {
            infoById.setCity(city)
            await this.informationRepository.save(infoById);
          }
        }

        if(updateInformationDto.informationTypeId != null || updateInformationDto.informationTypeId != undefined) {
          const infoByType: InformationType = await this.checkInfoType(updateInformationDto.informationTypeId)
          if(infoByType) {
            infoById.setInformationType(infoByType)
            await this.informationRepository.save(infoById);
          }
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
        return 'Eliminado exitosamente registro info ' + infoById.title;
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
