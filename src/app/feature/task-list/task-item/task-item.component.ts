import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { TaskItemInterface } from '../../../shared/models/task-item.interface';
import { ConfirmationService } from 'primeng/api';
import { TasksService } from '../../../shared/services/tasks.service';
import { Subscription, switchMap, tap } from 'rxjs';
import { ColorTypes } from '../../../shared/models/colors.model';
import { FormBuilder } from '@angular/forms';
import { ListsService } from '../../../shared/services/lists.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItemComponent implements OnInit, OnDestroy {
  @Input() task: TaskItemInterface;
  @Output() onMessage = new EventEmitter<string>();
  public subscriptions: Subscription[] = [];
  public colors; // all colors
  public displayLabelEdit = false;
  public displayMoveItem = false;
  public displayEditItem = false;
  public dismissibleMask = true;
  public colorsArr = ColorTypes;
  public appliedColors = []; //colors that are applied
  public form;
  public loading = this.tasksService.loading;
  public selectedList: string;
  public items = [
    {
      icon: 'pi pi-pencil',
      command: () => {
        this.onTaskEdit();
      },
    },
    {
      icon: 'pi pi-paperclip',
      command: () => {
        this.onLabelEdit();
      },
      tooltipOptions: {
        tooltipLabel: 'Change labels',
      },
    },
    {
      icon: 'pi pi-trash',
      command: () => {
        this.confirmationService.confirm({
          message: 'Are you sure that you want to proceed?',
          accept: () => {
            const sub = this.deleteTask(this.task).subscribe();
            this.subscriptions.push(sub);
          },
          reject: () => {
            this.tasksService.onNotification.next('rejected');
          },
        });
      },
    },
    {
      icon: 'pi pi-arrow-right',
      tooltipOptions: {
        tooltipLabel: 'Move',
      },
      command: () => {
        this.onItemMove();
      },
    },
  ];

  constructor(
    private confirmationService: ConfirmationService,
    private tasksService: TasksService,
    private listsService: ListsService,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.form = this.fb.group({
      labelColors: this.fb.array(this.colorsArr.map(e => !1)),
    });
  }

  onShowEditDialog() {
    if (this.task.labels) {
      this.appliedColors = this.task.labels;
      const allColors = this.colorsArr.map(el => el.color);
      this.appliedColors.forEach(el => {
        const indexOfExistedColor = allColors.indexOf(el.color);
        if (indexOfExistedColor !== -1) {
          this.form
            .get('labelColors')
            .controls[indexOfExistedColor].setValue(true);
        }
      });
    }
  }

  onLabelEditCancel() {
    this.closeDialog();
    this.form.reset();
  }

  onApplyLabels() {
    this.closeDialog();
    const sub = this.tasksService
      .editTask({ ...this.task, labels: this.appliedColors })
      .pipe(
        tap(task => {
          this.form.reset();
          this.tasksService.tasksUpdated.next(task);
        })
      )
      .subscribe();
    this.subscriptions.push(sub);
  }
  onChangeCheckbox(e) {
    const changedColor = this.colorsArr.filter(
      color => color.color === e.source.id
    )[0];
    if (changedColor) {
      if (e.checked) {
        this.appliedColors.push(changedColor);
      } else {
        const index = this.appliedColors.findIndex(
          item => item.color === changedColor.color
        );
        this.appliedColors.splice(index, 1);
      }
    }
  }
  deleteTask(task) {
    return this.tasksService.deleteTask(task).pipe(
      tap(() => {
        this.tasksService.onNotification.next('success');
        this.tasksService.tasksUpdated.next(task);
      })
    );
  }
  onLabelEdit() {
    this.displayLabelEdit = true;
  }
  get lists() {
    const lists = this.listsService.lists.map(list => {
      if (list.name === this.task.type) return { ...list, inactive: true };
      return { ...list, inactive: false };
    });
    return lists;
  }

  // when user clicks move button
  onItemMove() {
    this.displayMoveItem = true;
  }
  // when user confirms to move the task
  public onDestinationChange(e) {
    const oldTask = this.task;
    const newTask = { ...this.task, type: e.option.name };
    this.tasksService.onTaskDestinationChange.next([oldTask, newTask]);
  }

  public onTaskEdit() {
    this.displayEditItem = true;
  }
  closeDialog() {
    this.displayLabelEdit = !this.displayLabelEdit;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
