import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComplainantsService } from './complainants.service';
import { CreateComplainantDto } from './dto/create-complainant.dto';
import { UpdateComplainantDto } from './dto/update-complainant.dto';

@Controller('complainants')
export class ComplainantsController {
  constructor(private readonly complainantsService: ComplainantsService) {}

  @Post()
  create(@Body() createComplainantDto: CreateComplainantDto) {
    return this.complainantsService.create(createComplainantDto);
  }

  @Get()
  findAll() {
    return this.complainantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.complainantsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComplainantDto: UpdateComplainantDto) {
    return this.complainantsService.update(+id, updateComplainantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.complainantsService.remove(+id);
  }
}
