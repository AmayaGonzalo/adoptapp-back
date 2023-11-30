import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Controller('cliente')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('nuevo')
  async createClient(@Body() clientDto: ClientDto):Promise<Client> {
    return await this.clientService.createNewClient(clientDto);
  }

  @Get()
  async findAllClient():Promise<Client[]> {
    return await this.clientService.findAll();
  }

  @Get(':id')
  async findOneClient(@Param('id') id:number):Promise<Client> {
    return await this.clientService.findOne(id);
  }

  @Put('modificar/:id')
  async updateClient(@Param('id') id:number, @Body() updateClientDto: UpdateClientDto) {
    return await this.clientService.update(id, updateClientDto);
  }

  @Delete('eliminar/:id')
  async removeClient(@Param('id') id:number):Promise<string> {
    return await this.clientService.remove(id);
  }
}
