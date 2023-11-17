import { PartialType } from '@nestjs/mapped-types';
import { CreateComplaintTypeDto } from './create-complaint_type.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateComplaintTypeDto extends PartialType(CreateComplaintTypeDto) {
    
    @IsString()
    @IsNotEmpty()
    type: string;
}
