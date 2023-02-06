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
  public subscriptions: Subscription[];
  colors; // all colors
  displayLabelEdit = false;
  displayMoveItem = false;
  dismissableMask = true;
  colorsArr = ColorTypes;
  appliedColors = []; //colors that are applied
  form;
  public selectedList: string;
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
          target: event.target,
          message: 'Are you sure that you want to proceed?',
          icon: 'pi pi-exclamation-triangle',
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
    {
      icon: 'pi pi-external-link',
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

  onItemMove() {
    this.displayMoveItem = true;
  }
  get lists() {
    return this.listsService.lists;
  }
  public onDestinationChange(event) {
    const oldTask = this.task;
    const newTask = { ...this.task, type: event.option.name };
    this.confirmationService.confirm({
      target: event.originalEvent.target,
      message: 'Are you sure that you want to move this task  ?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const sub = this.tasksService
          .editTask(newTask)
          .pipe(
            tap(() => {
              this.tasksService.tasksUpdated.next(newTask);
              this.tasksService.tasksUpdated.next(oldTask);
            })
          )
          .subscribe();
        this.subscriptions.push(sub);
      },
    });
  }

  closeDialog() {
    this.displayLabelEdit = !this.displayLabelEdit;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
