import { PartialType } from '@nestjs/mapped-types';
import { CreateComplainantDto } from './create-complainant.dto';

export class UpdateComplainantDto extends PartialType(CreateComplainantDto) {}
