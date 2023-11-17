import { IsNotEmpty, IsString } from "class-validator";

export class UpdateInstitutionDto  {
    @IsString()
    @IsNotEmpty()
    readonly name:string;

    @IsString()
    @IsNotEmpty()
    readonly address:string;
}
