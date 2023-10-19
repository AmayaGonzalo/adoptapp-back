import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateAdoptionDto } from './dto/update-adoption.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Adoption } from './entities/adoption.entity';
import { Repository } from 'typeorm';
import { Pet } from 'src/pet/entities/pet.entity';
import { City } from 'src/city/entities/city.entity';
import { Client } from 'src/client/entities/client.entity';

@Injectable()
export class AdoptionService {

  constructor(@InjectRepository(Adoption)
              private readonly adoptionRepository:Repository<Adoption>,
              @InjectRepository(Pet)
              private readonly petRepository:Repository<Pet>,
              @InjectRepository(City)
              private readonly cityRepository:Repository<City>,
              @InjectRepository(Client)
              private readonly clientRepository:Repository<Client>
  ){}

  async create(updateAdoptionDto:UpdateAdoptionDto):Promise<{ cityName: string, petName: string, clientName: string }> {
    try{
      const { petId, cityId, clientId } = updateAdoptionDto;
      let pet: Pet = await this.petRepository.findOne({ where:{id:petId} });
      if(!pet){
        throw new Error('No se encontró la mascota para ser adoptada');
      }else{
        let city: City = await this.cityRepository.findOne({ where:{id:cityId} });
        if(!city){
          throw new Error('La mascota no se encuentra registrada en ninguna ciudad');
        }else{
          let client: Client = await this.clientRepository.findOne({ where:{id:clientId} });
          if(!client){
            throw new Error('No se encuentra registrado el cliente');
          }else{
            const adoption: Adoption = await this.adoptionRepository.save(new Adoption());            
            adoption.city = city;
            adoption.pet = pet;
            adoption.client = client;            
            await this.adoptionRepository.save(adoption);
            return {
              cityName: adoption.city.name,
              petName: adoption.pet.name,
              clientName: adoption.client.name + ' ' + adoption.client.surname
            }
          }
        }
      }
    }
    catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en adopción - ' + error

      },HttpStatus.NOT_FOUND);
    }  
  }

  async findAll():Promise<Adoption[]> {
    try{
      const adoptions: Adoption[] = await this.adoptionRepository.find({relations:['client', 'pet', 'city']});
      if(!adoptions){
        throw new Error('No se encontró la lista de adopciones');
      }else{
        return adoptions;
      }
    }
    catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en adopción - ' + error

      },HttpStatus.NOT_FOUND);
    }  
  }
  

  async findOne(updateAdoptionDto:UpdateAdoptionDto):Promise<Adoption> {
    try{
      const { cityId, petId, clientId } = updateAdoptionDto;
      const city: City = await this.cityRepository.findOne({ where:{id:cityId} });
      if(!city){
        throw new Error('No se encontró la ciudad donde se realizó la adopción');
      }else{
        const pet: Pet = await this.petRepository.findOne({ where:{id:petId}} );
        if(!pet){
          throw new Error('No se encontró la mascota adoptada');
        }else{
          const client: Client = await this.clientRepository.findOne({ where:{id:clientId}} );
          if(!client){
            throw new Error('No se encontró la persona que realizó la adopción');
          }else{
            const adoption: Adoption = await this.adoptionRepository.findOne({ where: { client:{id:clientId}, city:{id:cityId}, pet:{id:petId} }, relations:['pet', 'client', 'city'] });
            if(!adoption){
              throw new Error('No se encontró la adopción buscada');
            }else{
              return adoption;
            }
          }
        }
      }

    }
    catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en adopción - ' + error

      },HttpStatus.NOT_FOUND);
    }  
  }

  async update(id:number, updateAdoptionDto:UpdateAdoptionDto):Promise<Adoption> {
    try{
      const { petId, clientId, cityId } = updateAdoptionDto;
      const pet : Pet = await this.petRepository.findOne({ where:{id:petId} });
      if(!pet){
        throw new Error('No se encontró la mascota que buscas modificar');
      }else{        
        const client : Client = await this.clientRepository.findOne({ where:{ id:clientId} });
        if(!client){
          throw new Error('No se encontró la persona adoptante que deseas modificar');
        }else{
          const city: City = await this.cityRepository.findOne({ where:{id: cityId} });
          if(!city){
            throw new Error('No se econtró la ciudad que deseas cambiar');
          }else{
            
            let adoption: Adoption = await this.adoptionRepository.findOne({ where:{id:id } , relations:['pet', 'client', 'city'] });
            if(!adoption){
              throw new Error('No se encontró la adopción a modificar')          
            }else{             
              adoption.pet = pet;
              adoption.client = client;
              adoption.city = city;
              adoption = await this.adoptionRepository.save(adoption);
              return adoption;
            }
          }
        }
      }
    }
    catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en adopción - ' + error

      },HttpStatus.NOT_FOUND);
    }  
  }

  async remove(id:number,updateAdoptionDto:UpdateAdoptionDto): Promise<string> {
    try{
      const { petId, clientId, cityId } = updateAdoptionDto;
      const pet : Pet = await this.petRepository.findOne({ where:{id:petId} });
      if(!pet){
        throw new Error('No se encontró la mascota que buscas');
      }else{
        const client : Client = await this.clientRepository.findOne({ where:{ id:clientId} });
        if(!client){
          throw new Error('No se encontró la persona que realizó la adopción');
        }else{
          const city: City = await this.cityRepository.findOne({ where:{id: cityId} });
          if(!city){
            throw new Error('No se econtró la ciudad donde se realizó la adopción');
          }else{
            const adoption : Adoption = await this.adoptionRepository.findOne({where:{id: id} });
            if(!adoption){
              throw new Error('No se encontró la adopción')          
            }else{
              await this.adoptionRepository.remove(adoption);
              return 'Se eliminó exitosamente'
            }
          }
        }
      }
    }
    catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en adopción - ' + error

      },HttpStatus.NOT_FOUND);
    }  
  }
}
