import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InstitutionService } from './institution.service';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { InstitutionDTO } from './entities/institution.entity';
import { CreateInstitutionDto } from './dto/create-institution.dto';

@Controller('institution')
export class InstitutionController {
  constructor(private readonly institutionService: InstitutionService) {}

  @Post('create')
  async createNew(@Body() institutionDto: InstitutionDTO):Promise<CreateInstitutionDto> {
    return await this.institutionService.create(institutionDto);
  }

  @Get()
  async findAll():Promise<InstitutionDTO[]> {
    return this.institutionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string):Promise<InstitutionDTO> {
    return this.institutionService.findOne(+id);
  }

  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() updateInstitutionDto: UpdateInstitutionDto):Promise<InstitutionDTO> {
    return this.institutionService.update(+id, updateInstitutionDto);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string):Promise<string> {
    return this.institutionService.remove(+id);
  }
}
