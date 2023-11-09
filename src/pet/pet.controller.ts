import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Controller('pets')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post('nuevo')
  async createNewPet(@Body() createPetDto: PetDto):Promise<PetDto> {
    return await this.petService.createNewPet(createPetDto);
  }

  // @Get()
  // async findAllPet():Promise<PetDto[]> {
  //   return await this.petService.findAll();
  // }

  @Get('count')
    async getCount(): Promise<number> {
        return await this.petService.countPets();
  }

  @Get('filter__:pageNumber')
  async filterPet(@Param('pageNumber') pageNumber: number, @Query('specie') specie?: string, @Query('sex') sex?: string, @Query('location') location?: number  ):Promise<PetDto[]> {
    return await this.petService.filterPets(pageNumber, specie, location, sex);
  }

  // @Get(':id')
  // async findOnePet(@Param('id') id:number): Promise<PetDto> {
  //   return await this.petService.findOne(id);
  // }

  // @Put('modificar/:id')
  // async updatePet(@Param('id') id: number, @Body() updatePetDto: UpdatePetDto):Promise<PetDto> {
  //   return await this.petService.update(id, updatePetDto);
  // }

  // @Delete('eliminar/:id')
  // async removePet(@Param('id') id:number):Promise<string> {
  //   return await this.petService.remove(id);
  //}
}
