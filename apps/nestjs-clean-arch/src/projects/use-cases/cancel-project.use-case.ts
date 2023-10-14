import { Inject } from '@nestjs/common';
import { CancelProjectDto } from '../dto/cancel-project.dto';
import { IProjectRepository } from '../project.repositories';

export class CancelProjectUseCase {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepo: IProjectRepository,
  ) {}
  async execute(id: string, input: CancelProjectDto) {
    const project = await this.projectRepo.findById(id);
    // project.cancel(input.canceled_at);
    await this.projectRepo.update(project);
    return project;
  }
}
