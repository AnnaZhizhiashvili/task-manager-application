import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { BadgeNamePipe } from './badge-name.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { HttpClientModule } from '@angular/common/http';
import { SpeedDialModule } from 'primeng/speeddial';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { NotifierModule } from 'angular-notifier';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NewItemComponent } from './components/new-item/new-item.component';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@NgModule({
  declarations: [BadgeNamePipe, NewItemComponent],
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
    DialogModule,
    CheckboxModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    InputTextModule,
    OverlayPanelModule,
  ],
  exports: [NewItemComponent, BadgeNamePipe],
  providers: [ConfirmationService],
})
export class SharedModule {}
