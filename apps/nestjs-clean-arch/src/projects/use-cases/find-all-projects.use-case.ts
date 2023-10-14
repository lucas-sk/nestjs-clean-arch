import { Inject, Injectable } from '@nestjs/common';
import { IProjectRepository } from '../project.repositories';

@Injectable()
export class FindAllProjectsUseCase {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepo: IProjectRepository,
  ) {}

  async execute() {
    return this.projectRepo.findAll();
  }
}
