import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdatePetDto{
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly specie: string;

    @IsString()
    @IsNotEmpty()
    readonly sex: string;

    @IsNumber()
    @IsNotEmpty()
    readonly age: number;

    @IsString()
    readonly description: string;

    @IsString()
    @IsNotEmpty()
    readonly url_img: string;
}
