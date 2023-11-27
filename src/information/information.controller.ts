import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InformationService } from './information.service';
import { CreateInformationDto } from './dto/create-information.dto';
import { UpdateInformationDto } from './dto/update-information.dto';

@Controller('information')
export class InformationController {
  constructor(private readonly informationService: InformationService) {}

  @Post('create')
  create(@Body() createInformationDto: CreateInformationDto) {
    return this.informationService.create(createInformationDto);
  }

  
  @Get('count')
  getCount() {
    return this.informationService.getCount();
  }


  @Get('page/:pageNumber')
  findAll(@Param('pageNumber') pageNumber: number) {
    return this.informationService.findAll(pageNumber);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.informationService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateInformationDto: UpdateInformationDto) {
    return this.informationService.update(+id, updateInformationDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.informationService.remove(+id);
  }
}
