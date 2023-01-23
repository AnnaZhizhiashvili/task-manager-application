import { Component, OnInit } from '@angular/core';
import {
  concatMap,
  find,
  interval,
  mergeMap,
  Observable,
  Subject,
  tap,
} from 'rxjs';
import { TasksService } from '../../shared/services/tasks.service';
import { NotifierService } from 'angular-notifier';
import { NotificationsService } from '../../shared/services/notifications.service';
import { ListsService } from '../../shared/services/lists.service';
import { TaskListInterface } from '../../shared/models/task-list.interface';
import { HelperService } from '../../shared/services/helper.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public display = false;
  addingNewListMode = false;
  public taskLists$ = new Subject<TaskListInterface[]>();
  public newListValue: string;
  public message;
  constructor(
    private tasksService: TasksService,
    private listsService: ListsService,
    private notificationsService: NotificationsService,
    private helperService: HelperService
  ) {}
  ngOnInit() {
    this.getLists().subscribe();
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
    return this.listsService
      .getLists()
      .pipe(tap((lists: TaskListInterface[]) => this.taskLists$.next(lists)));
  }

  addNewList() {
    this.addingNewListMode = !this.addingNewListMode;
    const newList: TaskListInterface = {
      name: this.newListValue,
      id: this.helperService.uniqueID(),
    };
    this.listsService
      .createList(newList)
      .pipe(concatMap(() => this.getLists()))
      .subscribe();
  }

  newItemValueChanged(val) {
    this.newListValue = val;
  }
}
