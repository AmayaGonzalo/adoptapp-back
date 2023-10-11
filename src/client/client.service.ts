import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {

  constructor(@InjectRepository(Client)
              private readonly clientRepository:Repository<Client>){}

  async create(ClientDto: ClientDto):Promise<ClientDto> {
    try{
      const { name, surname, age, email, areaCode, phoneNumber, address, livingPlace } = ClientDto;
      const newClient: ClientDto = await this.clientRepository.save(new Client(name, surname, age, email, areaCode, phoneNumber, address, livingPlace ));
      if(!newClient){
        throw new Error('No se pudo crear el cliente');
      }
      else{
        return newClient;
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Cliente - ' + error
      },HttpStatus.NOT_FOUND);
    }    
  }

  async findAll():Promise<ClientDto[]> {
    try{
      const clients: ClientDto[] = await this.clientRepository.find();
      if(!clients){
        throw new Error('Lo siento, no se encontró la lista de clientes');
      }else{
        return clients;
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Cliente - ' + error
      },HttpStatus.NOT_FOUND);
    }    
  }  

  async findOne(id: number):Promise<ClientDto> {
    try{
      const client: ClientDto = await this.clientRepository.findOne({ where:{id:id} });
      if(!client){
        throw new Error('No se encontró el cliente');
      }else{
        return client;
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Cliente - ' + error
      },HttpStatus.NOT_FOUND);
    }    
  }

  async update(id: number, updateClientDto: UpdateClientDto):Promise<ClientDto> {
    try{
      const { name, surname, age, email, areaCode, phoneNumber, address, livingPlace } = updateClientDto;
      let client: Client = await this.clientRepository.findOne({ where:{id:id} });
      if(!client){
        throw new Error('No se encontró el cliente que buscas modificar')
      }else{
        if(name != null || name != undefined){
          client.setName(name);
          client = await this.clientRepository.save(client);
        }
        if(surname != null || surname != undefined){
          client.setSurname(surname);
          client = await this.clientRepository.save(client);
        }
        if(age != null || age != undefined){
          client.setAge(age);
          client = await this.clientRepository.save(client);
        }
        if(email != null || email != undefined){
          client.setEmail(email);
          client = await this.clientRepository.save(client);
        }
        if(areaCode != null || areaCode != undefined){
          client.setAreaCode(areaCode);
          client = await this.clientRepository.save(client);
        }
        if(phoneNumber != null || phoneNumber != undefined){
          client.setPhoneNumber(phoneNumber);
          client = await this.clientRepository.save(client);
        }
        if(address != null || address != undefined){
          client.setAddress(address);
          client = await this.clientRepository.save(client);
        }
        if(livingPlace != null || livingPlace != undefined){
          client.setLivingPlace(livingPlace);
          client = await this.clientRepository.save(client);
        }
        return client;
      }      
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Cliente - ' + error
      },HttpStatus.NOT_FOUND);
    }    
  }

  async remove(id: number):Promise<string> {
    try{
      const client: Client = await this.clientRepository.findOne({ where:{id:id} });
      if(!client){
        throw new Error('Lo siento, no se encontró el cliente que desea eliminar');
      }else{
        await this.clientRepository.remove(client);
        return `Se eliminó exitosamente`;
      }    
    } 
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Cliente - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }
}
