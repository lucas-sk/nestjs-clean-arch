import { randomUUID } from 'node:crypto';
import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum ProjectStatus {
  Pending = 'pending',
  Cancelled = 'cancelled',
  Active = 'active',
  Completed = 'completed',
}

@Entity()
export class Project {
  @PrimaryColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column({ nullable: true, type: 'datetime' })
  started_at: Date | null = null;
  @Column({ nullable: true, type: 'datetime' })
  finished_at: Date | null = null;
  @Column({ nullable: true, type: 'datetime' })
  cancelled_at: Date | null = null;
  @Column({ nullable: true, type: 'datetime' })
  forecasted_at: Date | null = null;
  @Column({
    type: 'simple-enum',
  })
  status: ProjectStatus = ProjectStatus.Pending;

  constructor(
    props: {
      name: string;
      description: string;
      started_at?: Date | null;
      cancelled_at?: Date | null;
      forecasted_at?: Date | null;
    },
    id?: string,
  ) {
    Object.assign(this, props);
    this.id = id ?? randomUUID();
    if (props?.started_at) {
      this.start(props.started_at);
    }
  }

  start(started_at: Date) {
    if (this.status === ProjectStatus.Active) {
      throw new Error('Cannot start activated project');
    }

    if (this.status === ProjectStatus.Completed) {
      throw new Error('Cannot start completed project');
    }

    if (this.status === ProjectStatus.Cancelled) {
      throw new Error('Cannot start cancelled project');
    }

    this.started_at = started_at;
    this.status = ProjectStatus.Active;
  }

  cancel(cancelled_at: Date) {
    if (this.status === ProjectStatus.Completed) {
      throw new Error('Cannot cancel completed project');
    }

    if (this.status === ProjectStatus.Cancelled) {
      throw new Error('Cannot cancel cancelled project');
    }

    if (cancelled_at < this.started_at) {
      throw new Error('Cannot cancel project before it was started');
    }

    this.cancelled_at = cancelled_at;
    this.status = ProjectStatus.Cancelled;
  }

  finish(finished_at: Date) {
    if (this.status === ProjectStatus.Completed) {
      throw new Error('Cannot finish completed project');
    }

    if (this.status === ProjectStatus.Cancelled) {
      throw new Error('Cannot finish cancelled project');
    }

    if (finished_at < this.started_at) {
      throw new Error('Cannot finish project before it was started');
    }

    this.finished_at = finished_at;
    this.status = ProjectStatus.Completed;
  }

  changeName(newName: string) {
    this.name = newName;
  }

  changeDescription(description: string) {
    this.description = description;
  }

  changeForecastedDate(date: Date) {
    this.forecasted_at = date;
  }
}
