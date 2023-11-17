import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CityService {

  constructor(@InjectRepository(City)
              private readonly cityRepository:Repository<City>
              ){}

  async create(cityDto: CityDto):Promise<CityDto> {
    try{
      const newCity: CityDto = await this.cityRepository.save(new City(cityDto.name, cityDto.zipCode));
      if(!newCity){
        throw new Error('No se pudo crear la ciudad');
      }else{
        return newCity;
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Ciudad - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  async findAll():Promise<CityDto[]> {
    try{
      const cities: CityDto[] = await this.cityRepository.find();
      if(!cities){
        throw new Error('No se encontró la lista de ciudades');
      }else{
        return cities;
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Ciudad - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: number):Promise<CityDto> {
    try{
      const city: CityDto = await this.cityRepository.findOne({ where:{id:id} });
      if(!city){
        throw new Error('No se encontró la ciudad buscada');
      }else{
        return city;
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Ciudad - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updateCityDto: UpdateCityDto):Promise<CityDto> {
    try{
      const { name, zipCode } = updateCityDto;
      let city: City = await this.cityRepository.findOne({ where:{id:id} });
      if(!city){
        throw new Error('No se econtró la ciudad que busca modificar');
      }else{
        if(name != null || name != undefined){
          city.setName(name);
          city = await this.cityRepository.save(city);
        }
        if(zipCode != null || zipCode != undefined){
          city.setZipCode(zipCode);
          city = await this.cityRepository.save(city);
        }
        return city;
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Ciudad - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: number):Promise<string> {
    try{
      const city: City = await this.cityRepository.findOne({ where:{id:id} });
      if(!city){
        throw new Error('Lo siento, no se encontró la ciudad que desea eliminar');
      }else{
        await this.cityRepository.remove(city);
        return 'Se ha eliminado la ciudad ' + city.name + ' exitosamente';
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Ciudad - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }
}
