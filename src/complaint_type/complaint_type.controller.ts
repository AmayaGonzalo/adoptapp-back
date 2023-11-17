import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComplaintTypeService } from './complaint_type.service';
import { CreateComplaintTypeDto } from './dto/create-complaint_type.dto';
import { UpdateComplaintTypeDto } from './dto/update-complaint_type.dto';

@Controller('complaint-type')
export class ComplaintTypeController {
  constructor(private readonly complaintTypeService: ComplaintTypeService) {}

  @Post('create-complaint')
  create(@Body() createComplaintTypeDto: CreateComplaintTypeDto) {
    return this.complaintTypeService.create(createComplaintTypeDto);
  }

  @Get()
  findAll() {
    return this.complaintTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.complaintTypeService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: number, @Body() updateComplaintTypeDto: UpdateComplaintTypeDto) {
    return this.complaintTypeService.update(id, updateComplaintTypeDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.complaintTypeService.remove(+id);
  }
}
