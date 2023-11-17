import { IsNotEmpty, IsString } from "class-validator";

export class CreateComplaintTypeDto {

    @IsString()
    @IsNotEmpty()
    type: string;
}
