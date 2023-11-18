import { IsNotEmpty, IsString } from "class-validator";

export class CreateComplainantDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: number;
}
