import { Module } from '@nestjs/common';
import { ProblemsController } from './problems.controller';
import { ProblemsService } from './problems.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Problem, ProblemSchema } from './schemas/problem.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'users_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    MongooseModule.forRoot('mongodb://localhost:27017/problems-DevProblem'),
    MongooseModule.forFeature([{ name: Problem.name, schema: ProblemSchema }]),
  ],
  controllers: [ProblemsController],
  providers: [ProblemsService],
})
export class AppModule {}
