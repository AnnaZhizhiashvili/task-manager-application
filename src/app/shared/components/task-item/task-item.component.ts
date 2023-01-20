import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskItemInterface } from '../../models/task-item.interface';
import { ConfirmationService } from 'primeng/api';
import { TasksService } from '../../services/tasks.service';
import { concatMap, from, Observable, of, Subject, tap } from 'rxjs';
import { ColorTypes } from '../../models/colors.model';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent implements OnInit {
  @Output() onMessage = new EventEmitter<string>();
  colors; // all colors
  colorsArray = []; //colors that are applied
  displayLabelEdit = false;
  dismissableMask = true;
  colorsArr = ColorTypes;
  form;
  colorsForm;
  colorCheckboxValues;
  constructor(
    private confirmationService: ConfirmationService,
    private tasksService: TasksService,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.getColors();
    this.addLabelColorControls();

    this.form = this.fb.group({
      labelColors: this.fb.array(this.colorsArr.map(e => !1)),
    });
  }
  closeDialog() {
    this.displayLabelEdit = !this.displayLabelEdit;
  }
  onLabelEditCancel() {
    this.closeDialog();
    this.form.reset();
  }
  addLabelColorControls() {
    const arr = this.colorsArr.map(el => this.fb.control(false));
    return this.fb.array(arr);
  }
  // get labelColorControls(): FormArray {
  //   return this.form.get('labelColors');
  // }

  onShowEditDialog() {
    if (this.task.labels) {
      this.colorsArray = this.task.labels;
      console.log(this.colorsArray);
      console.log(this.colorsArr);
      const allColors = this.colorsArr.map(el => el.color);
      this.colorsArray.forEach(el => {
        const indexOfExistedColor = allColors.indexOf(el.color);
        if (indexOfExistedColor !== -1) {
          console.log(indexOfExistedColor);
          console.log(
            this.form.get('labelColors').controls[indexOfExistedColor]
          );
          this.form
            .get('labelColors')
            .controls[indexOfExistedColor].setValue(true);
        }
      });
      // const colors = this.colorsArray.map(item => item.color);
      // this.colors.forEach((item, i) => {
      //   console.log(item, 'itemmmm');
      //   if (colors.includes(item.color)) {
      //     this.colors[i].isSelected = true;
      //   }
      // });
    }
  }
  onApplyLabels() {
    this.closeDialog();
    this.tasksService
      .editTask({ ...this.task, labels: this.colorsArray })
      .pipe(
        tap(task => {
          this.form.reset();
          this.tasksService.tasksUpdated.next(task);
        })
      )
      .subscribe();
  }

  resetLabelEdit() {
    this.colorsArray = [];
    this.colors = this.colors.map(color => ({
      ...color,
      isSelected: false,
    }));
  }
  onChangeCheckbox(e) {
    const changedColor = this.colorsArr.filter(
      color => color.color === e.source.id
    )[0];

    if (changedColor) {
      if (e.checked) {
        this.colorsArray.push(changedColor);
      } else {
        const index = this.colorsArray.indexOf(changedColor);
        this.colorsArray.splice(index, 1);
      }
    }
  }

  getColors() {
    this.colors = ColorTypes.map(color => ({ ...color, isSelected: false }));
  }

  @Input() task: TaskItemInterface = {
    description: 'task description',
    id: 111111111,
    type: 'To Do',
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
      icon: 'pi pi-upload',
    },
    {
      icon: 'pi pi-external-link',
    },
  ];

  onLabelEdit() {
    this.displayLabelEdit = true;
  }
  deleteTask(task) {
    return this.tasksService.deleteTask(task).pipe(
      tap(() => {
        this.tasksService.onNotification.next('success');
        this.tasksService.tasksUpdated.next(task);
      })
    );
  }
}
