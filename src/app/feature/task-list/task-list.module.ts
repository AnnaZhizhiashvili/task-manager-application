import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list/task-list.component';
import { SharedModule } from '../../shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TaskItemComponent } from './task-item/task-item.component';
import { BadgeModule } from 'primeng/badge';
import { SpeedDialModule } from 'primeng/speeddial';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [TaskListComponent, TaskItemComponent],
  imports: [
    CommonModule,
    SharedModule,
    DragDropModule,
    OverlayPanelModule,
    CardModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCheckboxModule,
    ConfirmPopupModule,
    BadgeModule,
    SpeedDialModule,
    DialogModule,
  ],
  exports: [TaskListComponent],
})
export class TaskListModule {}
