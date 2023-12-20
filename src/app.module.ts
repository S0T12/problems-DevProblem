import { Module } from '@nestjs/common';
import { ProblemsController } from './problems.controller';
import { ProblemsService } from './problems.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Problem, ProblemSchema } from './schemas/problem.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/problems-DevProblem'),
    MongooseModule.forFeature([{ name: Problem.name, schema: ProblemSchema }]),
  ],
  controllers: [ProblemsController],
  providers: [ProblemsService],
})
export class AppModule {}
