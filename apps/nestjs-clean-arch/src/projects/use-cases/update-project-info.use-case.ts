import { Inject } from '@nestjs/common';
import { UpdateProjectInfoDto } from '../dto/update-project-info.dto';
import { IProjectRepository } from '../project.repositories';

export class UpdateProjectInfoUseCase {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepo: IProjectRepository,
  ) {}

  async execute(id: string, { name, description }: UpdateProjectInfoDto) {
    const project = await this.projectRepo.findById(id);

    name && project.changeName(name);
    description && project.changeDescription(description);

    this.projectRepo.update(project);
    return project;
  }
}
