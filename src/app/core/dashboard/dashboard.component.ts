import { Component, OnDestroy, OnInit } from '@angular/core';
import { concatMap, Subject, Subscription, switchMap, tap } from 'rxjs';
import { TasksService } from '../../shared/services/tasks.service';
import { NotificationsService } from '../../shared/services/notifications.service';
import { ListsService } from '../../shared/services/lists.service';
import { TaskListInterface } from '../../shared/models/task-list.interface';
import { HelperService } from '../../shared/services/helper.service';
import { FormControl, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TaskItemInterface } from '../../shared/models/task-item.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public display = false;
  addingNewListMode = false;
  public taskLists = [];
  public taskLists$ = new Subject<TaskListInterface[]>();
  public newListValue: string;
  public newItem = new FormControl('', Validators.required);
  public subscriptions: Subscription[] = [];
  items = [];
  public loading;

  constructor(
    private tasksService: TasksService,
    private listsService: ListsService,
    private notificationsService: NotificationsService,
    private helperService: HelperService,
    private confirmationsService: ConfirmationService
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
    this.onTaskDestinationChange();
  }

  getLists() {
    return this.listsService.getLists().pipe(
      tap((lists: TaskListInterface[]) => {
        this.taskLists = lists;
        this.taskLists$.next(lists);
      })
    );
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

  deleteList(list) {
    const sub = this.listsService
      .deleteList(list)
      .pipe(concatMap(() => this.getLists()))
      .subscribe();
    this.subscriptions.push(sub);
  }

  onTaskDestinationChange() {
    this.tasksService.onTaskDestinationChange
      .pipe(
        tap(tasks => {
          const oldTask = tasks[0];
          const newTask = tasks[1];
          return this.confirmationsService.confirm({
            message: 'Are you sure that you want to move this task ?',
            accept: () => {
              this.changeTaskDestinationAndUpdate(oldTask, newTask);
            },
          });
        })
      )
      .subscribe();
  }

  changeTaskDestinationAndUpdate(oldTask, newTask) {
    return this.tasksService
      .editTask(newTask)
      .pipe(
        tap(() => {
          // I need to update two lists, 1. The list from which task is moved
          // 2. the list where we moved our task
          this.tasksService.tasksUpdated.next(newTask);
          this.tasksService.tasksUpdated.next(oldTask);
        })
      )
      .subscribe();
  }
  drop(event: CdkDragDrop<TaskItemInterface[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.taskLists, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
