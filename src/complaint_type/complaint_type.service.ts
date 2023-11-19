import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateComplaintTypeDto } from './dto/create-complaint_type.dto';
import { UpdateComplaintTypeDto } from './dto/update-complaint_type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ComplaintType } from './entities/complaint_type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ComplaintTypeService {
  constructor(@InjectRepository(ComplaintType)
              private readonly complaintRepository:Repository<ComplaintType>
              ){}

  async create(createComplaintTypeDto: CreateComplaintTypeDto):Promise<ComplaintType> {
    try {
      let newComplaint: ComplaintType = await this.complaintRepository.save(new ComplaintType(createComplaintTypeDto.type))
      if(!newComplaint) {
        throw new Error ('No se pudo crear el complaint')
      } else {
        return newComplaint;
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en complaint - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  async findAll():Promise<ComplaintType[]> {
    try {
      const allComplaintTypes: ComplaintType[] = await this.complaintRepository.find()
      if(!allComplaintTypes) {
        throw new Error ('no se pudo encontrar complaint types')
      } else {
        return allComplaintTypes;  
      }
    }
    catch(error) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en complaint - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: number):Promise<ComplaintType> {
    try {
      const complaint: ComplaintType = await this.complaintRepository.findOne({ where:{id:id}})
      if(!complaint) {
        throw new Error ('no se pudo encontrar complaint')
      } else {
        return complaint;  
      }
    }
    catch(error) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en complaint - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updateComplaintTypeDto: UpdateComplaintTypeDto):Promise<ComplaintType> {
    try {
      let complaint: ComplaintType = await this.complaintRepository.findOne({ where:{id:id}})
      if(!complaint) {
        throw new Error ('no se pudo encontrar complaint')
      } else {
        if(updateComplaintTypeDto.type != null || updateComplaintTypeDto.type == undefined) {
          complaint.setType(updateComplaintTypeDto.type)
          complaint = await this.complaintRepository.save(complaint)
        }
        return complaint;  
      }
    }
    catch(error) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en complaint - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: number):Promise<string> {
    try {
      let complaint: ComplaintType = await this.complaintRepository.findOne({ where:{id:id}})
      if(!complaint) {
        throw new Error ('no se pudo encontrar complaint')
      } else {
        await this.complaintRepository.remove(complaint)
        return 'Se ha eliminado el complaint ' + complaint.type + ' exitosamente';  
      }
    }
    catch(error) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en complaint - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }
}
