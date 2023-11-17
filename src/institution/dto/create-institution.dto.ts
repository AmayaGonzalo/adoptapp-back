import { IsNotEmpty, IsString } from "class-validator";

export class CreateInstitutionDto {
    
    @IsString()
    @IsNotEmpty()
    readonly name:string;

    @IsString()
    @IsNotEmpty()
    readonly address:string;
}
