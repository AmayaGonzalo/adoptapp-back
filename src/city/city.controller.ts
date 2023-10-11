import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CityService } from './city.service';
import { CityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Controller('ciudad')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post('nuevo')
  async createCity(@Body() cityDto: CityDto):Promise<CityDto> {
    return await this.cityService.create(cityDto);
  }

  @Get()
  async findAllCity():Promise<CityDto[]> {
    return await this.cityService.findAll();
  }

  @Get(':id')
  async findOneCity(@Param('id') id:number):Promise<CityDto> {
    return await this.cityService.findOne(id);
  }

  @Put('modificar/:id')
  async updateCity(@Param('id') id:number, @Body() updateCityDto: UpdateCityDto) {
    return this.cityService.update(id, updateCityDto);
  }

  @Delete('eliminar/:id')
  async removeCity(@Param('id') id:number):Promise<string> {
    return await this.cityService.remove(id);
  }
}
