import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { PetService } from './pet.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './entities/pet.entity';

@Controller('pets')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post('create')
  async createNewPet(@Body() createPetDto: CreatePetDto):Promise<string> {
    return await this.petService.createNewPet(createPetDto);
  }

  //corregir
  @Get()
  async findAllPet():Promise<Pet[]> {
    return await this.petService.findAll();
  }

  @Get('count')
    async getCount(): Promise<number> {
        return await this.petService.countPets();
  }

  @Get('filter__:pageNumber')
  async filterPets(@Param('pageNumber') pageNumber: number, @Query('specie') specie?: string, @Query('sex') sex?: string, @Query('location') location?: number  ):Promise<CreatePetDto[]> {
    return await this.petService.filterPets(pageNumber, specie, location, sex);
  }

  @Get(':id')
  async findOnePet(@Param('id') id:number): Promise<Pet> {
    return await this.petService.findOne(id);
  }

  @Put('update/:id')
  async updatePet(@Param('id') id: number, @Body() updatePetDto: UpdatePetDto):Promise<Pet> {
    return await this.petService.update(id, updatePetDto);
  }

  @Delete('eliminar/:id')
  async removePet(@Param('id') id:number):Promise<string> {
    return await this.petService.remove(id);
  }
}
