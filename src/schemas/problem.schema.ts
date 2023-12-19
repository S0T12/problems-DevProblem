import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProblemDocument = HydratedDocument<Problem>;

@Schema()
export class Problem {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  creator: string;

  @Prop()
  ideas: string[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt: Date;
}

export const ProblemSchema = SchemaFactory.createForClass(Problem);
