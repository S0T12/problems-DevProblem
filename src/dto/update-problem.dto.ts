import { PickType } from '@nestjs/mapped-types';
import { CreateProblemDto } from './create-problem.dto';
import { ObjectId } from 'mongodb';

export class UpdateProblemDto extends PickType(CreateProblemDto, [
  'description',
  'title' as const,
]) {
  id: ObjectId;
}
