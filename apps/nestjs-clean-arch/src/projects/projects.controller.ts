import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProjectDto } from '../projects/dto/create-project.dto';
import { StartProjectDto } from '../projects/dto/start-project.dto';
import { UpdateProjectInfoDto } from '../projects/dto/update-project-info.dto';
import { CancelProjectUseCase } from './use-cases/cancel-project.use-case';
import { CompleteProjectUseCase } from './use-cases/complete-project.use-case';
import { CreateProjectUseCase } from './use-cases/create-project.use-case';
import { FindAllProjectsUseCase } from './use-cases/find-all-projects.use-case';
import { ListUniqueProjectUseCase } from './use-cases/list-unique-project.use-case';
import { StartProjectUseCase } from './use-cases/start-project.use-case';
import { UpdateProjectInfoUseCase } from './use-cases/update-project-info.use-case';

@Controller('projects')
export class ProjectsController {
  @Inject(CreateProjectUseCase)
  private readonly createProjectUseCase: CreateProjectUseCase;

  @Inject(FindAllProjectsUseCase)
  private readonly findAllProjectsUseCase: FindAllProjectsUseCase;

  @Inject(UpdateProjectInfoUseCase)
  private readonly updateProjectInfoUseCase: UpdateProjectInfoUseCase;

  @Inject(StartProjectUseCase)
  private readonly startProjectUseCase: StartProjectUseCase;

  @Inject(CompleteProjectUseCase)
  private readonly completeProjectUseCase: CompleteProjectUseCase;

  @Inject(CancelProjectUseCase)
  private readonly cancelProjectUseCase: CancelProjectUseCase;

  @Inject(ListUniqueProjectUseCase)
  private readonly listUniqueProjectUseCase: ListUniqueProjectUseCase;

  @Post()
  create(@Body() body: CreateProjectDto) {
    return this.createProjectUseCase.execute(body);
  }

  @Get()
  findAll() {
    return this.findAllProjectsUseCase.execute();
  }

  @Get(':id')
  findByID(@Param('id') id: string) {
    return this.listUniqueProjectUseCase.execute(id);
  }

  @Patch(':id')
  updateProjectInfo(
    @Param('id') id: string,
    @Body() body: UpdateProjectInfoDto,
  ) {
    return this.updateProjectInfoUseCase.execute(id, body);
  }

  @Post(':id/start')
  start(@Param('id') id: string, @Body() body: StartProjectDto) {
    return this.startProjectUseCase.execute(id, body);
  }

  // @Post(':id/cancel')
  // finish(@Param('id') id: string, @Body() body: CancelProjectDto) {
  //   return this.cancelProjectUseCase.execute(id, body);
  // }

  // @Post(':id/complete')
  // complete(@Param('id') id: string, @Body() body: CompleteProjectDto) {
  //   return this.completeProjectUseCase.execute(id, body);
  // }
}
