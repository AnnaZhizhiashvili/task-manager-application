import { Component, Input, OnInit } from '@angular/core';
import { TaskListInterface } from '../../models/task-list.interface';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TaskItemInterface } from '../../models/task-item.interface';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  constructor(private task: TasksService) {}
  @Input() list: TaskListInterface;
  public addNewCard = false;

  drop(event: CdkDragDrop<TaskItemInterface[]>) {
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
  ngOnInit() {
    const list: TaskListInterface = { name: 'new List', index: 2, tasks: [] };
    // this.task.createList(list).subscribe();

    this.task.getLists().subscribe();
  }
}
