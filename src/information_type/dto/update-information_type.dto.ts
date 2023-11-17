import { PartialType } from '@nestjs/mapped-types';
import { CreateInformationTypeDto } from './create-information_type.dto';
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateInformationTypeDto extends PartialType(CreateInformationTypeDto) {

    @IsString()
    @IsNotEmpty()
    readonly type: string;
}
