import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum NotificationType {
  MESSAGE,
  ALERT,
}

export interface NotificationEvent {
  type: NotificationType;
  title?: string;
  message: string;
}

@Injectable()
export class NotificationService {
  private notificationSource = new BehaviorSubject<NotificationEvent>(null);

  notifications$ = this.notificationSource.asObservable();

  send(notification: NotificationEvent) {
    this.notificationSource.next(notification);
  }
}
