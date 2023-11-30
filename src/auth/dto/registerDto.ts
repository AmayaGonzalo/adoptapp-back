import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";
import { Role } from "src/common/enum/role.enum";

export class RegisterDto{
    
    
    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @MinLength(6)
    readonly password: string;

    @IsString()
    @IsNotEmpty()
    readonly role?: Role;

    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly surname: string;

    @IsNumber()
    @IsNotEmpty()
    readonly age: number;

    @IsNumber()
    @IsNotEmpty()
    readonly areaCode: number;

    @IsNumber()
    @IsNotEmpty()
    readonly phoneNumber: number;

    @IsString()
    @IsNotEmpty()
    readonly address: string;

    @IsNumber()
    @IsNotEmpty()
    readonly address_height: number;

    @IsString()
    readonly livingPlace: string;  
    
    @IsNumber()
    @IsNotEmpty()
    readonly city: number;
}