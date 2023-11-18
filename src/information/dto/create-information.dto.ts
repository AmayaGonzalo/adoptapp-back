import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateInformationDto {

    @IsString()
    @IsNotEmpty()
    informationUrl: string;

    @IsString()
    @IsNotEmpty()
    imgUrl: string;
}
