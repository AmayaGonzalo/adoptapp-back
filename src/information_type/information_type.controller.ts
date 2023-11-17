import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InformationTypeService } from './information_type.service';
import { CreateInformationTypeDto } from './dto/create-information_type.dto';
import { UpdateInformationTypeDto } from './dto/update-information_type.dto';
import { InformationTypeDTO } from './entities/information_type.entity';

@Controller('information-type')
export class InformationTypeController {
  constructor(private readonly informationTypeService: InformationTypeService) {}

  @Post('create-type')
  create(@Body() createInformationTypeDto: CreateInformationTypeDto): Promise<CreateInformationTypeDto> {
    return this.informationTypeService.create(createInformationTypeDto);
  }

  @Get()
  async findAll(): Promise<InformationTypeDTO[]> {
    return this.informationTypeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<InformationTypeDTO> {
    return this.informationTypeService.findOne(id);
  }

  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() updateInformationTypeDto: UpdateInformationTypeDto): Promise<InformationTypeDTO> {
    return this.informationTypeService.update(+id, updateInformationTypeDto);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string): Promise<string> {
    return this.informationTypeService.remove(+id);
  }
}
