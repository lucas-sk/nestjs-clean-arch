import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectTypeOrmRepository } from './project.repositories';

import { ProjectsController } from './projects.controller';
import { CancelProjectUseCase } from './use-cases/cancel-project.use-case';
import { CompleteProjectUseCase } from './use-cases/complete-project.use-case';
import { CreateProjectUseCase } from './use-cases/create-project.use-case';
import { FindAllProjectsUseCase } from './use-cases/find-all-projects.use-case';
import { ListUniqueProjectUseCase } from './use-cases/list-unique-project.use-case';
import { StartProjectUseCase } from './use-cases/start-project.use-case';
import { UpdateProjectInfoUseCase } from './use-cases/update-project-info.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [ProjectsController],
  providers: [
    CancelProjectUseCase,
    CompleteProjectUseCase,
    CreateProjectUseCase,
    FindAllProjectsUseCase,
    StartProjectUseCase,
    UpdateProjectInfoUseCase,
    ListUniqueProjectUseCase,
    ProjectTypeOrmRepository,
    {
      provide: 'IProjectRepository',
      useExisting: ProjectTypeOrmRepository,
    },
  ],
})
export class ProjectsModule {}
