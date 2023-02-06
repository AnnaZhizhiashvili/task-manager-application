import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { TaskListInterface } from '../../../shared/models/task-list.interface';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TaskItemInterface } from '../../../shared/models/task-item.interface';
import { TasksService } from '../../../shared/services/tasks.service';
import { concatMap, of, Subject, Subscription, tap } from 'rxjs';
import { HelperService } from '../../../shared/services/helper.service';
import { ColorTypes } from '../../../shared/models/colors.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent implements OnInit, OnDestroy {
  constructor(
    private tasksService: TasksService,
    private helperService: HelperService
  ) {}
  @Input() list: TaskListInterface;
  @Output() onDeleteList = new EventEmitter();
  public addNewCard = false;
  public newTaskDescription: string;
  public tasks: TaskItemInterface[];
  public tasks$ = new Subject<TaskItemInterface[]>();
  public newItem = new FormControl('', Validators.required);
  public subscriptions: Subscription[];

  drop(event: CdkDragDrop<TaskItemInterface[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    const newTask: TaskItemInterface = {
      ...event.item.data,
      type: this.list.name,
    };
    const sub = this.editTask(newTask).subscribe();
    this.subscriptions.push(sub);
  }
  ngOnInit() {
    const sub = this.getTasks().subscribe();
    this.subscriptions.push(sub);
    const tasksUpdatedSub = this.tasksService.tasksUpdated
      .pipe(
        concatMap((task: TaskItemInterface) => {
          if (task.type === this.list.name) {
            return this.getTasks();
          }
          return of([]);
        })
      )
      .subscribe();
    this.subscriptions.push(tasksUpdatedSub);
    const newItemValueChangesSub = this.newItem.valueChanges.subscribe(
      value => (this.newTaskDescription = value)
    );
    this.subscriptions.push(newItemValueChangesSub);
  }
  public addNewTask() {
    this.addNewCard = !this.addNewCard;
    const newTask: TaskItemInterface = {
      id: this.helperService.uniqueID(),
      description: this.newTaskDescription,
      type: this.list.name,
    };
    const sub = this.tasksService
      .createTask(newTask)
      .pipe(
        concatMap(() => this.getTasks()),
        tap(tasks => (this.tasks = tasks))
      )
      .subscribe();
    this.newTaskDescription = '';
    this.subscriptions.push(sub);
  }
  public getTasks() {
    return this.tasksService.getTasks(this.list.name).pipe(
      tap((tasks: TaskItemInterface[]) => {
        this.tasks = tasks;
        this.tasks$.next(tasks);
      })
    );
  }
  public editTask(task) {
    return this.tasksService.editTask(task);
  }
  deleteList() {
    this.onDeleteList.emit(this.list);
  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
