import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/common/enum/role.enum';

export class CreateUserDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    readonly username?: string;

    @IsString()
    @IsNotEmpty()
    readonly role?: Role;
}
