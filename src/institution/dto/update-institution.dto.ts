import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateInstitutionDto  {
    @IsString()
    @IsNotEmpty()
    readonly name:string;

    @IsString()
    @IsNotEmpty()
    readonly address:string;

    @IsNumber()
    @IsNotEmpty()
    readonly cityID: number;
}
