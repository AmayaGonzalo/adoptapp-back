import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerDto';

// import { ClientDto } from 'src/client/dto/create-client.dto';
// // import { LoginDto } from './dto/loginDto';
// // import { AuthGuard } from './auth.guard';
// import { ClientDto } from 'src/client/dto/create-client.dto';
import { LoginDto } from './dto/loginDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<any> {
    return await this.authService.registerNewUserAndClient(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto:LoginDto){
    return await this.authService.login(loginDto);
  }

  // @Post('register')
  // async register(@Body() clientDto:ClientDto):Promise<any> {
  //   try {
  //     const registrationResult = await this.authService.register(clientDto);
  //     return {
  //       status: 'success',
  //       data: registrationResult,
  //     };  
  //   } catch (error) {
  //     return {
  //       status: 'error',
  //       message: 'Error during registration: ' + error.message,
  //     };
  //   }
  // }

    //   // 4. Se devuelve el resultado del registro.
    //   return registrationResult;
    // } catch (error) {
    //   // 5. Se manejan los errores y se devuelve una respuesta adecuada.
    //   return {
    //     status: 'error',
    //     message: 'Error during registration: ' + error.message,
    //   };
    // }
  
}
