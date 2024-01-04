import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Problem } from './schemas/problem.schema';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProblemsService {
  constructor(
    @InjectModel(Problem.name) private ProblemModel: Model<Problem>,
    @Inject('USERS_SERVICE') private readonly client: ClientProxy,
  ) {
    this.client.connect();
  }
  async create(createProblemDto: CreateProblemDto): Promise<Problem> {
    try {
      const user = await firstValueFrom(
        this.client.send<string>('findByUsername', createProblemDto.creator),
      );

      if (!user) throw new BadRequestException('User not exists');

      const problem = new this.ProblemModel(createProblemDto).save();
      return problem;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    const result = await this.ProblemModel.find();
    return result;
  }

  async findOne(id: ObjectId) {
    const result = await this.ProblemModel.findById(id);
    return result;
  }

  async update(id: ObjectId, updateProblemDto: UpdateProblemDto) {
    const result = await this.ProblemModel.updateOne(id, updateProblemDto);
    return result;
  }

  async remove(id: ObjectId): Promise<any> {
    const result = await this.ProblemModel.deleteOne(id);
    return result;
  }
}
