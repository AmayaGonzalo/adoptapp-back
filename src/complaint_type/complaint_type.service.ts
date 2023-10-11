import { Injectable } from '@nestjs/common';
import { CreateComplaintTypeDto } from './dto/create-complaint_type.dto';
import { UpdateComplaintTypeDto } from './dto/update-complaint_type.dto';

@Injectable()
export class ComplaintTypeService {
  create(createComplaintTypeDto: CreateComplaintTypeDto) {
    return 'This action adds a new complaintType';
  }

  findAll() {
    return `This action returns all complaintType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} complaintType`;
  }

  update(id: number, updateComplaintTypeDto: UpdateComplaintTypeDto) {
    return `This action updates a #${id} complaintType`;
  }

  remove(id: number) {
    return `This action removes a #${id} complaintType`;
  }
}
