import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { BadgeNamePipe } from './badge-name.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { HttpClientModule } from '@angular/common/http';
import { SpeedDialModule } from 'primeng/speeddial';
import { FormsModule } from '@angular/forms';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { NotifierModule } from 'angular-notifier';

@NgModule({
  declarations: [TaskItemComponent, TaskListComponent, BadgeNamePipe],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    BadgeModule,
    DragDropModule,
    InputTextareaModule,
    HttpClientModule,
    SpeedDialModule,
    FormsModule,
    ConfirmPopupModule,
    NotifierModule,
  ],
  exports: [TaskListComponent],
  providers: [ConfirmationService],
})
export class SharedModule {}
