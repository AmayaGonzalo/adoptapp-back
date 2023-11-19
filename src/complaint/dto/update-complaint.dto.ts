import { PartialType } from '@nestjs/mapped-types';
import { CreateComplaintDto } from './create-complaint.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateComplaintDto extends PartialType(CreateComplaintDto) {

    @IsString()
    @IsNotEmpty()
    description: string;
    
    @IsString()
    @IsNotEmpty()
    url_img: string;
}
