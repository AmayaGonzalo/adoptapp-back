import { PartialType } from '@nestjs/mapped-types';
import { AttributeDto } from './create-attribute.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAttributeDto extends PartialType(AttributeDto) {

    @IsNotEmpty()
    @IsString()
    readonly name:string;
}
