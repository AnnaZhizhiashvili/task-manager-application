import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private readonly notifier: NotifierService) {}
  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  public hideNotifications(): void {
    this.notifier.hideAll();
  }
}
