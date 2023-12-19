import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProblemsService } from './problems.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';

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
  findOne(@Payload() id: number) {
    return this.problemsService.findOne(id);
  }

  @MessagePattern('updateProblem')
  update(@Payload() updateProblemDto: UpdateProblemDto) {
    return this.problemsService.update(updateProblemDto.id, updateProblemDto);
  }

  @MessagePattern('removeProblem')
  remove(@Payload() id: number) {
    return this.problemsService.remove(id);
  }
}
