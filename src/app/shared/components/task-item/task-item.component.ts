import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { TaskItemInterface } from '../../models/task-item.interface';
import { ConfirmationService } from 'primeng/api';
import { TasksService } from '../../services/tasks.service';
import { tap } from 'rxjs';
import { ColorTypes } from '../../models/colors.model';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItemComponent implements OnInit {
  @Input() task: TaskItemInterface;
  @Output() onMessage = new EventEmitter<string>();
  colors; // all colors
  displayLabelEdit = false;
  dismissableMask = true;
  colorsArr = ColorTypes;
  appliedColors = []; //colors that are applied
  form;
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
            this.deleteTask(this.task).subscribe();
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
    },
    {
      icon: 'pi pi-external-link',
    },
  ];

  constructor(
    private confirmationService: ConfirmationService,
    private tasksService: TasksService,
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
    this.tasksService
      .editTask({ ...this.task, labels: this.appliedColors })
      .pipe(
        tap(task => {
          this.form.reset();
          this.tasksService.tasksUpdated.next(task);
        })
      )
      .subscribe();
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
  closeDialog() {
    this.displayLabelEdit = !this.displayLabelEdit;
  }
}
