import { IsNotEmpty, IsString } from "class-validator";

export class CreateComplaintDto {
    @IsString()
    @IsNotEmpty()
    description: string;
    
    @IsString()
    @IsNotEmpty()
    url_img: string;
}
