import { CreateComplainantDto } from './dto/create-complainant.dto';
import { UpdateComplainantDto } from './dto/update-complainant.dto';
import { Complainant } from './entities/complainant.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ComplainantsService {
  constructor(@InjectRepository(Complainant)
              private readonly complainantRepository: Repository<Complainant>){}

  async create(createComplainantDto: CreateComplainantDto):Promise<CreateComplainantDto> {
    try {
      const { phoneNumber, email } = createComplainantDto;
      let complainant: CreateComplainantDto = await this.complainantRepository.create(new Complainant(email, phoneNumber));
      if(!complainant) {
        throw new Error ('no se pudo crear el registro')
      } else {
        complainant = await this.complainantRepository.save(complainant);
        return complainant;
      }
    }
    catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en complainant - ' + error
      },HttpStatus.NOT_FOUND);
    }  
  }

  async findAll():Promise<Complainant[]> {
    try{
      const complainants: Complainant[] = await this.complainantRepository.find();
      if(!complainants){
        throw new Error('Lo siento, no se encontró la lista complainants');
      }else{
        return complainants;
      } 
    }
    catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error al traer array complainants - ' + error

      },HttpStatus.NOT_FOUND);
    }  
  }

  async findOne(id: number):Promise<Complainant> {
    try{
      const complainant: Complainant = await this.complainantRepository.findOne({ where:{id:id} });
      if(!complainant){
        throw new Error('No se encontró el complainant con ese ID');
      }else{
        return complainant
      }  
    }
    catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en complainant - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updateComplainantDto: UpdateComplainantDto):Promise<Complainant> {
    try{
      let complainant: Complainant = await this.complainantRepository.findOne({ where:{id:id} });
      if(!complainant){
        throw new Error('No se encontró el complainant con ese ID');
      }else{
        if(updateComplainantDto.email != null || updateComplainantDto.email != undefined) {
          complainant.setEmail(updateComplainantDto.email)
          complainant = await this.complainantRepository.save(complainant)
        }
        if(updateComplainantDto.phoneNumber != null || updateComplainantDto.phoneNumber != undefined) {
          complainant.setPhoneNumber(updateComplainantDto.phoneNumber)
          complainant = await this.complainantRepository.save(complainant)
        }
        return complainant
      }  
    }
    catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en complainant - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: number):Promise<string> {
    try{
      let complainant: Complainant = await this.complainantRepository.findOne({ where:{id:id} });
      if(!complainant){
        throw new Error('No se encontró el complainant con ese ID');
      }else{
        await this.complainantRepository.remove(complainant)
        return "complainant " +complainant.email + " eliminado"
      }  
    }
    catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en complainant - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }
}
