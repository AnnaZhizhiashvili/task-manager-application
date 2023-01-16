import { Component, Input } from '@angular/core';
import { TaskItemInterface } from '../../models/task-item.interface';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  @Input() task: TaskItemInterface = {
    description: 'task description',
    members: [
      {
        name: 'Ana',
        surname: 'Zhizhiashvili',
        mail: 'AnaZhizhiashvili@gmail.com',
        color: 'warning',
      },
      {
        name: 'Mariam',
        surname: 'Bakhurauli',
        mail: 'MariamBakhurauli@gmail.com',
        color: 'info',
      },
    ],
  };
}
