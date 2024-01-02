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
  create(@Payload() createProblemDto: CreateProblemDto) {
    return this.problemsService.create(createProblemDto);
  }

  @MessagePattern('findAllProblems')
  findAll() {
    return this.problemsService.findAll();
  }

  @MessagePattern('findOneProblem')
  findOne(@Payload() id: ObjectId) {
    return this.problemsService.findOne(id);
  }

  @MessagePattern('updateProblem')
  update(
    @Payload() payload: { id: ObjectId; updateProblemDto: UpdateProblemDto },
  ) {
    return this.problemsService.update(payload.id, payload.updateProblemDto);
  }

  @MessagePattern('removeProblem')
  remove(@Payload() id: ObjectId): Promise<any> {
    return this.problemsService.remove(id);
  }
}
