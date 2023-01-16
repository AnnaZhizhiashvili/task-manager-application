import { TaskItemInterface } from './task-item.interface';

export interface TaskListInterface {
  index: number;
  name: string;
  tasks: TaskItemInterface[];
}
