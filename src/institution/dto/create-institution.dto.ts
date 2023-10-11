import { IsNotEmpty, IsString } from "class-validator";

export class InstitutionDto {
    
    @IsString()
    @IsNotEmpty()
    readonly name:string;

    @IsString()
    @IsNotEmpty()
    readonly address:string;
}
