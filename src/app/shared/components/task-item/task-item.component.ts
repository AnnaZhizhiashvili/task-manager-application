import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskItemInterface } from '../../models/task-item.interface';
import { ConfirmationService } from 'primeng/api';
import { TasksService } from '../../services/tasks.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  constructor(
    private confirmationService: ConfirmationService,
    private tasksService: TasksService
  ) {}
  @Output() onMessage = new EventEmitter<string>();

  @Input() task: TaskItemInterface = {
    description: 'task description',
    id: 111111111,
    type: 'To Do',
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

  public items = [
    {
      icon: 'pi pi-pencil',
      command: () => {
        // this.messageService.add({
        //   severity: 'info',
        //   summary: 'Add',
        //   detail: 'Data Added',
        // });
      },
    },
    {
      icon: 'pi pi-refresh',
      command: () => {
        // this.messageService.add({
        //   severity: 'success',
        //   summary: 'Update',
        //   detail: 'Data Updated',
        // });
      },
    },
    {
      icon: 'pi pi-trash',
      command: () => {
        this.confirmationService.confirm({
          target: event.target,
          message: 'Are you sure that you want to proceed?',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.deleteTask(this.task).subscribe();
          },
          reject: () => {
            this.tasksService.onNotification.next('rejected');
          },
        });
      },
    },
    {
      icon: 'pi pi-upload',
    },
    {
      icon: 'pi pi-external-link',
      url: 'http://angular.io',
    },
  ];

  onShow() {
    console.log(this.task);
    console.log('show');
  }
  onHide() {
    console.log('hide');
  }
  deleteTask(task) {
    return this.tasksService.deleteTask(task).pipe(
      tap(() => {
        this.tasksService.onNotification.next('success');
        this.tasksService.tasksUpdated.next(task);
      })
    );
  }
}
