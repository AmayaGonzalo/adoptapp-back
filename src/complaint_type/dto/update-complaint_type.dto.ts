import { PartialType } from '@nestjs/mapped-types';
import { CreateComplaintTypeDto } from './create-complaint_type.dto';

export class UpdateComplaintTypeDto extends PartialType(CreateComplaintTypeDto) {}
