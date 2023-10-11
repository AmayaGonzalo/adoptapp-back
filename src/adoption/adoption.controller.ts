import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { AdoptionService } from './adoption.service';
import { Adoption } from './entities/adoption.entity';
import { UpdateAdoptionDto } from './dto/update-adoption.dto';

@Controller('adopcion')
export class AdoptionController {
  constructor(private readonly adoptionService: AdoptionService) {}

  @Post('nuevo')
  async createAdoption(@Body() updateAdoptionDto:UpdateAdoptionDto):Promise<Adoption> {
    return await this.adoptionService.create(updateAdoptionDto);
  }

  @Get('todos')
  async findAllAdoptions():Promise<Adoption[]> {
    return await this.adoptionService.findAll();
  }

  @Get('uno')
  async findOneAdoption(@Body() updateAdoptionDto:UpdateAdoptionDto):Promise<Adoption> {
    return await this.adoptionService.findOne(updateAdoptionDto);
  }

  @Put('modificar/:id')
  async updateAdoption(@Param('id') id: number, @Body() updateAdoptionDto:UpdateAdoptionDto):Promise<Adoption> {
    return await this.adoptionService.update(id,updateAdoptionDto);
  }

  @Delete('eliminar/:id')
  async removeAdoption(@Param('id') id:number,@Body() updateAdoptionDto:UpdateAdoptionDto):Promise<string> {
    return await this.adoptionService.remove(id,updateAdoptionDto);
  }
}
