import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { UpdateComplaintDto } from './dto/update-complaint.dto';
import { Complaint } from './entities/complaint.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ComplaintService {

  constructor(@InjectRepository(Complaint)
              private readonly complaintRepository: Repository<Complaint>) {}

  async create(createComplaintDto: CreateComplaintDto):Promise<Complaint> {
    try{
      const complaintNuevo: Complaint = await this.complaintRepository.save(new Complaint(createComplaintDto.description, createComplaintDto.url_img));
      if(!complaintNuevo){
        throw new Error('No se pudo crear el complaint');
      }else{
        return complaintNuevo;
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en creacion complaint - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  async findAll():Promise<Complaint[]> {
    try{
      const allComplaints: Complaint[] = await this.complaintRepository.find();
      if(!allComplaints){
        throw new Error('No se encontró el array complaint');
      }else{
        return allComplaints;
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en busqueda complaint - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: number):Promise<Complaint> {
    try{
      const complaintBuscado: Complaint = await this.complaintRepository.findOne({ where:{id:id} });
      if(!complaintBuscado){
        throw new Error('No se encontró el complaint buscado');
      }else{
        return complaintBuscado;
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en busqueda complaint - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updateComplaintDto: UpdateComplaintDto):Promise<Complaint> {
    try{
      let complaintBuscado: Complaint = await this.complaintRepository.findOne({ where:{id:id} });
      if(!complaintBuscado){
        throw new Error('No se encontró el complaint buscado');
      }else{
        if (updateComplaintDto.description != null || updateComplaintDto.description != undefined) {
          complaintBuscado.setDescription(updateComplaintDto.description);
          complaintBuscado = await this.complaintRepository.save(complaintBuscado);
        }
        if (updateComplaintDto.url_img != null || updateComplaintDto.url_img != undefined) {
          complaintBuscado.setUrl_img(updateComplaintDto.url_img);
          complaintBuscado = await this.complaintRepository.save(complaintBuscado);
        }
        return complaintBuscado;
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en busqueda complaint - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: number):Promise<string> {
    try{
      let complaintBuscado: Complaint = await this.complaintRepository.findOne({ where:{id:id} });
      if(!complaintBuscado){
        throw new Error('No se encontró el complaint buscado');
      }else{
        await this.complaintRepository.remove(complaintBuscado);
        return "Se elimino el complaint";
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en eliminacion complaint - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }
}
