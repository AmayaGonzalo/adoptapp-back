import { PartialType } from '@nestjs/mapped-types';
import { CreateComplainantDto } from './create-complainant.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateComplainantDto extends PartialType(CreateComplainantDto) {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: number;
}
