import { Injectable } from '@nestjs/common';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Problem } from './schemas/problem.schema';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

@Injectable()
export class ProblemsService {
  constructor(@InjectModel(Problem.name) private ProbmeModel: Model<Problem>) {}
  async create(createProblemDto: CreateProblemDto) {
    try {
      const problem = new this.ProbmeModel(createProblemDto);
      await problem.save();
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    return await this.ProbmeModel.find().exec();
  }

  async findOne(id: ObjectId) {
    return await this.ProbmeModel.findById(id).exec();
  }

  async update(id: ObjectId, updateProblemDto: UpdateProblemDto) {
    return await this.ProbmeModel.updateOne(id, updateProblemDto).exec();
  }

  async remove(id: ObjectId): Promise<any> {
    return await this.ProbmeModel.deleteOne(id);
  }
}
