import { PartialType } from '@nestjs/mapped-types';
import { CreateInformationDto } from './create-information.dto';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class UpdateInformationDto extends PartialType(CreateInformationDto) {

    @IsString()
    @IsNotEmpty()
    informationUrl: string;

    @IsString()
    @IsNotEmpty()
    imgUrl: string;
}
