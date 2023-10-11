import { IsNotEmpty, IsNumber } from 'class-validator';

export class AdoptionDto {

    @IsNumber()
    @IsNotEmpty()
    readonly clientId: number;

    @IsNumber()
    @IsNotEmpty()
    readonly petId: number;

    @IsNumber()
    @IsNotEmpty()
    readonly cityId: number;

}
