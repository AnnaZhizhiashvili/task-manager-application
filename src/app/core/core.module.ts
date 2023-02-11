import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import {
  CdkDropList,
  CdkDropListGroup,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { NotifierModule } from 'angular-notifier';
import { TaskListModule } from '../feature/task-list/task-list.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ButtonModule,
    SidebarModule,
    SharedModule,
    DragDropModule,
    CdkDropListGroup,
    SlideMenuModule,
    NotifierModule.withConfig({
      position: { horizontal: { position: 'right' } },
      behaviour: { autoHide: 2000 },
    }),
    TaskListModule,
    ConfirmDialogModule,
    CdkDropList,
    SkeletonModule,
  ],
  exports: [DashboardComponent],
})
export class CoreModule {}
