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
        // this.messageService.add({
        //   severity: 'error',
        //   summary: 'Delete',
        //   detail: 'Data Deleted',
        // });
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
    console.log('show');
  }
  onHide() {
    console.log('hide');
  }
}
