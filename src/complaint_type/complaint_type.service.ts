import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateComplaintTypeDto } from './dto/create-complaint_type.dto';
import { UpdateComplaintTypeDto } from './dto/update-complaint_type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ComplaintTypeDTO } from './entities/complaint_type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ComplaintTypeService {
  constructor(@InjectRepository(ComplaintTypeDTO)
              private readonly complaintRepository:Repository<ComplaintTypeDTO>
              ){}

  async create(createComplaintTypeDto: CreateComplaintTypeDto):Promise<ComplaintTypeDTO> {
    try {
      let newComplaint: ComplaintTypeDTO = await this.complaintRepository.save(new ComplaintTypeDTO(createComplaintTypeDto.type))
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

  async findAll():Promise<ComplaintTypeDTO[]> {
    try {
      const allComplaintTypes: ComplaintTypeDTO[] = await this.complaintRepository.find()
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

  async findOne(id: number):Promise<ComplaintTypeDTO> {
    try {
      const complaint: ComplaintTypeDTO = await this.complaintRepository.findOne({ where:{id:id}})
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

  async update(id: number, updateComplaintTypeDto: UpdateComplaintTypeDto):Promise<ComplaintTypeDTO> {
    try {
      let complaint: ComplaintTypeDTO = await this.complaintRepository.findOne({ where:{id:id}})
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
      let complaint: ComplaintTypeDTO = await this.complaintRepository.findOne({ where:{id:id}})
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
