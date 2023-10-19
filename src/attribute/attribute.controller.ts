import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { AttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { Attribute } from './entities/attribute.entity';

@Controller('attribute')
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}

  @Post('nuevo')
  async create(@Body() attributeDto: AttributeDto):Promise<AttributeDto> {
    return await this.attributeService.create(attributeDto);
  }

  @Get()
  async findAll():Promise<Attribute[]> {
    return await this.attributeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id:number):Promise<AttributeDto> {
    return await this.attributeService.findOne(id);
  }

  @Put('modificar/:id')
  async update(@Param('id') id:number, @Body() updateAttributeDto: UpdateAttributeDto):Promise<AttributeDto> {
    return await this.attributeService.update(id, updateAttributeDto);
  }

  @Delete('eliminar/:id')
  async remove(@Param('id') id:number): Promise<{message:string}> {
    return await this.attributeService.remove(id);
  }
}
