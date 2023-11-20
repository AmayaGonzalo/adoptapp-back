import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CityDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    zipCode: string;
}
