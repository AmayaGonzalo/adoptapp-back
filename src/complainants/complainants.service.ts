import { Injectable } from '@nestjs/common';
import { CreateComplainantDto } from './dto/create-complainant.dto';
import { UpdateComplainantDto } from './dto/update-complainant.dto';

@Injectable()
export class ComplainantsService {
  create(createComplainantDto: CreateComplainantDto) {
    return 'This action adds a new complainant';
  }

  findAll() {
    return `This action returns all complainants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} complainant`;
  }

  update(id: number, updateComplainantDto: UpdateComplainantDto) {
    return `This action updates a #${id} complainant`;
  }

  remove(id: number) {
    return `This action removes a #${id} complainant`;
  }
}
