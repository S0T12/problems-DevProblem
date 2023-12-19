import { Module } from '@nestjs/common';
import { ProblemsController } from './problems.controller';
import { ProblemsService } from './problems.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/problems-DevProblem'),
  ],
  controllers: [ProblemsController],
  providers: [ProblemsService],
})
export class AppModule {}
