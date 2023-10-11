import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateClientDto {

    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly surname: string;

    @IsNumber()
    @IsNotEmpty()
    readonly age: number;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsNumber()
    @IsNotEmpty()
    readonly areaCode: number;

    @IsNumber()
    @IsNotEmpty()
    readonly phoneNumber: number;

    @IsString()
    @IsNotEmpty()
    readonly address: string;

    @IsString()
    readonly livingPlace: string; 
}
