import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './projects/entities/project.entity';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
    ProjectsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [Project],
      synchronize: true,
    }),
  ],
})
export class NestSimpleApiModule {}
