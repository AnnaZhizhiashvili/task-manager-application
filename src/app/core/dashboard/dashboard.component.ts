import { Component, OnDestroy, OnInit } from '@angular/core';
import { concatMap, Subject, Subscription, tap } from 'rxjs';
import { TasksService } from '../../shared/services/tasks.service';
import { NotificationsService } from '../../shared/services/notifications.service';
import { ListsService } from '../../shared/services/lists.service';
import { TaskListInterface } from '../../shared/models/task-list.interface';
import { HelperService } from '../../shared/services/helper.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public display = false;
  addingNewListMode = false;
  public taskLists$ = new Subject<TaskListInterface[]>();
  public newListValue: string;
  public newItem = new FormControl('', Validators.required);
  public subscriptions: Subscription[];

  constructor(
    private tasksService: TasksService,
    private listsService: ListsService,
    private notificationsService: NotificationsService,
    private helperService: HelperService
  ) {}
  ngOnInit() {
    const sub = this.getLists().subscribe();
    const notificationsSub = this.tasksService.onNotification
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

    const valueChangesSub = this.newItem.valueChanges.subscribe(value => {
      this.newListValue = value;
    });
    this.subscriptions.splice(0, 0, valueChangesSub, notificationsSub, sub);
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
    const sub = this.listsService
      .createList(newList)
      .pipe(concatMap(() => this.getLists()))
      .subscribe();
    this.subscriptions.push(sub);
  }

  newItemValueChanged(val) {
    this.newListValue = val;
  }

  deleteList(list) {
    const sub = this.listsService
      .deleteList(list)
      .pipe(concatMap(() => this.getLists()))
      .subscribe();
    this.subscriptions.push(sub);
  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
