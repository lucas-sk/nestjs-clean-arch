import { Inject } from '@nestjs/common';
import { IProjectRepository } from '../project.repositories';

export class ListUniqueProjectUseCase {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepo: IProjectRepository,
  ) {}

  execute(id: string) {
    console.log(id);
    return this.projectRepo.findById(id);
  }
}
