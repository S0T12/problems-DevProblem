import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProblemDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @IsString({ message: 'Creator must be a string' })
  @IsNotEmpty({ message: 'Creator is required' })
  creator: string;
}
