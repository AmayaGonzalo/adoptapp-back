import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InstitutionService } from './institution.service';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { Institution } from './entities/institution.entity';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { Pet } from 'src/pet/entities/pet.entity';

@Controller('institution')
export class InstitutionController {
  constructor(private readonly institutionService: InstitutionService) {}

  @Post('create')
  async createNew(@Body() institutionDto: Institution):Promise<CreateInstitutionDto> {
    return await this.institutionService.create(institutionDto);
  }

  @Get()
  async findAll():Promise<Institution[]> {
    return this.institutionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string):Promise<Institution> {
    return this.institutionService.findOne(+id);
  }

  @Get('buscarMascotas/:id')
  async buscar(@Param('id') id: number):Promise<Pet[]> {
    return this.institutionService.buscar(id);
  }

  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() updateInstitutionDto: UpdateInstitutionDto):Promise<Institution> {
    return this.institutionService.update(+id, updateInstitutionDto);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string):Promise<string> {
    return this.institutionService.remove(+id);
  }
}
