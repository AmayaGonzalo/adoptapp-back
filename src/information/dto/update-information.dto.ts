import { PartialType } from '@nestjs/mapped-types';
import { CreateInformationDto } from './create-information.dto';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateInformationDto extends PartialType(CreateInformationDto) {

    @IsString()
    @IsNotEmpty()
    imageUrlTitle: string;

    @IsString()
    imageUrlBody: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    descriptionUrl: string;

    @IsNumber()
    @IsNotEmpty()
    cityId: number;

    @IsNumber()
    @IsNotEmpty()
    informationTypeId: number;
}
