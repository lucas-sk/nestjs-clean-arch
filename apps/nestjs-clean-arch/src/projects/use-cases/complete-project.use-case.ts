import { Inject, Injectable } from '@nestjs/common';
import { CompleteProjectDto } from '../dto/complete-project.dto';
import { IProjectRepository } from '../project.repositories';

@Injectable()
export class CompleteProjectUseCase {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepo: IProjectRepository,
  ) {}

  async execute(id: string, input: CompleteProjectDto) {
    const project = await this.projectRepo.findById(id);
    // project.finish(input.finished_at);
    await this.projectRepo.update(project);
    return project;
  }
}
