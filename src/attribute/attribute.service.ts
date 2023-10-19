import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { Attribute } from './entities/attribute.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AttributeService {

  constructor(@InjectRepository(Attribute)
              private readonly repositoryAttribute:Repository<Attribute>
    ){}

  async create(attributeDto: AttributeDto):Promise<AttributeDto> {
    try{
      const { name } = attributeDto;
      const newAttribute: Attribute = await this.repositoryAttribute.save(new Attribute(name));
      if(!newAttribute){
        throw new Error('No se pudo crear el nuevo atributo');
      }else{
        return newAttribute;
      }
    }
    catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en Attribute - ' + error
      },HttpStatus.NOT_FOUND);
    }  
  }

  async findAll():Promise<Attribute[]> {
    try{
      const attribute: Attribute[] = await this.repositoryAttribute.find();
      if(!attribute){
        throw new Error('No se encontró la lista de atributos');
      }else{
        return attribute;
      }
    }
    catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en Attribute - ' + error
      },HttpStatus.NOT_FOUND);
    }  
  }

  async findOne(id: number):Promise<AttributeDto> {
    try{
      const attribute: AttributeDto = await this.repositoryAttribute.findOne({where:{ id: id }});
      if(!attribute){
        throw new Error('No se pudo encontrar el atributo');
      }else{
        return attribute;
      }
    }
    catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en Attribute - ' + error
      },HttpStatus.NOT_FOUND);
    }  
  }

  async update(id: number, updateAttributeDto: UpdateAttributeDto):Promise<AttributeDto> {
    try{
      const { name } = updateAttributeDto;
      let attribute: Attribute = await this.repositoryAttribute.findOne({ where:{ id: id }});
      if(!attribute){
        throw new Error('No se encontró el atributo a modificar');
      }else{
        if(name != null || name != undefined){
          attribute.setName(name);
          attribute = await this.repositoryAttribute.save(attribute);
          return attribute;
        }else{
          throw new Error('Asigna un nombre, por favor');
        }
      }
    }
    catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en Attribute - ' + error
      },HttpStatus.NOT_FOUND);
    }  
  }

  async remove(id: number):Promise<{ message: string }> {
    try{
      const attribute: Attribute = await this.repositoryAttribute.findOne({ where:{ id:id }});
      if(!attribute){
        throw new Error('No se encontró el atributo a eliminar');
      }else{
        await this.repositoryAttribute.remove(attribute);
        return{
          message:'El atributo ' + `${attribute.name}` +' se eliminó exitosamente',
        }
      }
    }
    catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en Attribute - ' + error
      },HttpStatus.NOT_FOUND);
    } 
  }
}
