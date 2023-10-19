import { IsNotEmpty, IsString } from "class-validator";

export class AttributeDto {

    @IsNotEmpty()
    @IsString()
    readonly name:string;
}
