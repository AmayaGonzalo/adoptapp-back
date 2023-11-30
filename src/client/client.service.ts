import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { City } from 'src/city/entities/city.entity';

@Injectable()
export class ClientService {

  constructor(@InjectRepository(Client)
              private readonly clientRepository:Repository<Client>,
              @InjectRepository(City)
              private readonly cityRepository:Repository<City>
  ){}

  // async findOneByEmail(email:string){
  //   return await this.clientRepository.findOneBy({email}); 
  // }

  async createNewClient(ClientDto: ClientDto):Promise<Client> {
    try{
      const { name, surname, age, email, areaCode, phoneNumber, address, livingPlace, city } = ClientDto;      
      const findCity: City = await this.cityRepository.findOne({ where:{ id:city }});
      if(!findCity){
        throw new Error('No se pudo encontrar la ciudad donde vives');
      }else{
        const newClient: Client = await this.clientRepository.save(new Client(name, surname, age, email, areaCode, phoneNumber, address, livingPlace));
        newClient.city = findCity; 
        await this.clientRepository.save(newClient);
        if(!newClient){
          throw new Error('No se pudo crear el cliente');
        }else{
          return newClient;
        }
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Cliente - ' + error
      },HttpStatus.NOT_FOUND);
    }    
  };

  async findAll():Promise<Client[]> {
    try{
      const clients: Client[] = await this.clientRepository.find();
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
  };

  async findOne(id: number):Promise<Client> {
    try{
      const client: Client = await this.clientRepository.findOne({ where:{id:id}, relations:['city'] });
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
  };

  async update(id: number, updateClientDto: UpdateClientDto):Promise<Client> {
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
  };

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
  };
  
  async addCity(body):Promise<any>{
    try{
      const  { cityId, clientId } = body;
      let client: Client = await this.clientRepository.findOne({ where:{id:clientId} });
      if(!client){
        throw new Error('No se encontró el cliente');
      }else{
        const city: City = await this.cityRepository.findOne({ where:{id:cityId} });
        if(!city){
          throw new Error('La ciudad que quiere asignar no existe');
        }else{
          client.city = city;
          await this.clientRepository.save(client);
          return client;
        }
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Cliente - ' + error
      },HttpStatus.NOT_FOUND);
    }
  };
}
