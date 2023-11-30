import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto{

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @MinLength(6)
    readonly password: string;
}