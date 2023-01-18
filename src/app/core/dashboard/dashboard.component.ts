import { Component, OnInit } from '@angular/core';
import { find, tap } from 'rxjs';
import { TasksService } from '../../shared/services/tasks.service';
import { NotifierService } from 'angular-notifier';
import { NotificationsService } from '../../shared/services/notifications.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public display = false;
  public taskLists = this.tasksService.taskLists;
  public message;
  constructor(
    private tasksService: TasksService,
    private notificationsService: NotificationsService
  ) {}
  ngOnInit() {
    this.tasksService.onNotification
      .pipe(
        tap(event => {
          if (event === 'success') {
            console.log('success');
            this.notificationsService.showNotification(
              'success',
              'you have successfully removed the task'
            );
          }
        })
      )
      .subscribe();
  }
}
