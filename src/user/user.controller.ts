import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/common/enum/role.enum';
import { AuthService } from 'src/auth/auth.service';
import { Client } from 'src/client/entities/client.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,
              
  ) {}

  @Post('nuevo')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createNewUser(createUserDto);
    
  }
  
  // @Get('perfil')
  // @UseGuards(AuthGuard)
  // async getHome(@Req() request){
  //   return this.userService.user(request.user.role);
  // }

  @Get('perfil')
  @UseGuards(AuthGuard)
  async getPerfil(@Req() request:any):Promise<any>{
   return await this.userService.getDataPersonal(request.user);
  }
}

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }

