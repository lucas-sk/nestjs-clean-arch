import { Inject, Injectable } from '@nestjs/common';
import { StartProjectDto } from '../dto/start-project.dto';
import { IProjectRepository } from '../project.repositories';

@Injectable()
export class StartProjectUseCase {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepo: IProjectRepository, //Repository em memoria
  ) {}

  async execute(id: string, input: StartProjectDto) {
    const project = await this.projectRepo.findById(id);
    project.start(input.started_at);
    await this.projectRepo.update(project);
    return project;
  }
}
