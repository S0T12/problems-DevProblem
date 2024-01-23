import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
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
  private readonly logger = new Logger(ProblemsService.name);
  private isConnected = false;
  constructor(
    @InjectModel(Problem.name) private ProblemModel: Model<Problem>,
    @Inject('USERS_SERVICE') private readonly usersclient: ClientProxy,
  ) {
    this.connectToClient();
  }

  private async connectToClient() {
    try {
      await this.usersclient.connect();
      this.isConnected = true;
      this.logger.log('Connected to the client successfully');
    } catch (error) {
      this.logger.error(
        `Error connecting to client: ${error.message}`,
        error.stack,
      );
    }
  }

  async create(
    createProblemDto: CreateProblemDto,
  ): Promise<Problem | BadRequestException> {
    try {
      if (!this.isConnected) {
        this.logger.warn('Client is not connected!');
        return;
      }
      const user = await firstValueFrom(
        this.usersclient.send<string>(
          'findByUsername',
          createProblemDto.creator,
        ),
      );

      if (!user) return new BadRequestException('User not exists');

      const problem = new this.ProblemModel(createProblemDto).save();
      return await problem;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    if (!this.isConnected) {
      this.logger.warn('Client is not connected!');
      return;
    }
    const result = await this.ProblemModel.find();
    return result;
  }

  async findOne(id: ObjectId) {
    if (!this.isConnected) {
      this.logger.warn('Client is not connected!');
      return;
    }
    const result = await this.ProblemModel.findById(id);
    return result;
  }

  async update(id: ObjectId, updateProblemDto: UpdateProblemDto) {
    if (!this.isConnected) {
      this.logger.warn('Client is not connected!');
      return;
    }
    const result = await this.ProblemModel.updateOne(id, updateProblemDto);
    return result;
  }

  async remove(id: ObjectId): Promise<any> {
    if (!this.isConnected) {
      this.logger.warn('Client is not connected!');
      return;
    }
    const result = await this.ProblemModel.deleteOne(id);
    return result;
  }
}
