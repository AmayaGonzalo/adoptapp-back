import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateCityDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    zipCode: number;
}
