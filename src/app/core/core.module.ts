import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import { DragDropModule } from 'primeng/dragdrop';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';
import { NotifierModule } from 'angular-notifier';

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
    NotifierModule.withConfig({
      position: { horizontal: { position: 'right' } },
      behaviour: { autoHide: 2000 },
    }),
  ],
  exports: [DashboardComponent],
})
export class CoreModule {}
