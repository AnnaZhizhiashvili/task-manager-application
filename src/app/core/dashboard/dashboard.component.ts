import { Component, OnInit } from '@angular/core';
import { find, interval, mergeMap, Observable, Subject, tap } from 'rxjs';
import { TasksService } from '../../shared/services/tasks.service';
import { NotifierService } from 'angular-notifier';
import { NotificationsService } from '../../shared/services/notifications.service';
import { ListsService } from '../../shared/services/lists.service';
import { TaskListInterface } from '../../shared/models/task-list.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public display = false;
  public taskLists$ = new Subject<TaskListInterface[]>();
  public message;
  constructor(
    private tasksService: TasksService,
    private listsService: ListsService,
    private notificationsService: NotificationsService
  ) {}
  ngOnInit() {
    this.getLists();
    this.tasksService.onNotification
      .pipe(
        tap(event => {
          if (event === 'success') {
            this.notificationsService.showNotification(
              'success',
              'you have successfully removed the task'
            );
          }
        })
      )
      .subscribe();
  }

  getLists() {
    this.listsService
      .getLists()
      .pipe(tap((lists: TaskListInterface[]) => this.taskLists$.next(lists)))
      .subscribe();
  }
}
