import { Component, Input } from '@angular/core';
import { TaskListInterface } from '../../models/task-list.interface';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TaskItemInterface } from '../../models/task-item.interface';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  @Input() list: TaskListInterface;

  drop(event: CdkDragDrop<TaskItemInterface[]>) {
    console.log(event.previousContainer === event.container, event);
    if (event.previousContainer === event.container) {
      moveItemInArray(this.list.tasks, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
