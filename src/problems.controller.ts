import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProblemsService } from './problems.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { ObjectId } from 'mongodb';

@Controller()
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @MessagePattern('createProblem')
  async create(@Payload() createProblemDto: CreateProblemDto) {
    return await this.problemsService.create(createProblemDto);
  }

  @MessagePattern('findAllProblems')
  async findAll() {
    return await this.problemsService.findAll();
  }

  @MessagePattern('findOneProblem')
  async findOne(@Payload() id: ObjectId) {
    return await this.problemsService.findOne(id);
  }

  @MessagePattern('updateProblem')
  async update(
    @Payload() payload: { id: ObjectId; updateProblemDto: UpdateProblemDto },
  ) {
    return await this.problemsService.update(
      payload.id,
      payload.updateProblemDto,
    );
  }

  @MessagePattern('removeProblem')
  async remove(@Payload() id: ObjectId): Promise<any> {
    return await this.problemsService.remove(id);
  }
}
