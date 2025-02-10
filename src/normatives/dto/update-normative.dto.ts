import { PartialType } from '@nestjs/mapped-types';
import { CreateNormativeDto } from './create-normative.dto';

export class UpdateNormativeDto extends PartialType(CreateNormativeDto) {}
