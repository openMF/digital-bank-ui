import { AfterViewInit, Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { NotificationEvent, NotificationService, NotificationType } from '../services/notification/notification.service';
import { HttpClientService } from '../services/http/http.service';
import { TdDialogService } from '@covalent/core/dialogs';
import { Subscription } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'ngx-notification',
  template: '',
})
export class NotificationComponent implements OnInit, OnDestroy, AfterViewInit {
  private notificationSubscription: Subscription;
  private errorSubscription: Subscription;

  constructor(
    private notificationService: NotificationService,
    private httpClient: HttpClientService,
    private snackBar: MatSnackBar,
    private viewContainerRef: ViewContainerRef,
    private dialogService: TdDialogService,
  ) {}

  ngOnInit(): void {
    const config: MatSnackBarConfig = new MatSnackBarConfig();
    config.viewContainerRef = this.viewContainerRef;
    this.notificationSubscription = this.notificationService.notifications$.subscribe((notification: NotificationEvent) =>
      this.showNotification(notification, config),
    );
  }

  ngOnDestroy(): void {
    this.notificationSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.errorSubscription = this.httpClient.error.subscribe((error: any) => this.showError(error));
  }

  private showNotification(notification: NotificationEvent, config: MatSnackBarConfig): void {
    switch (notification.type) {
      case NotificationType.MESSAGE:
        this.showMessage(notification.message, config);
        break;
      case NotificationType.ALERT:
        this.showAlert(notification.title, notification.message);
        break;
      default:
        break;
    }
  }

  private showError(error: any): void {
    switch (error.status) {
      case 400:
        this.showAlert('Unexpected error', 'We are very sorry, it seems the request you sent could not be accepted by our servers.');
        break;
      case 404:
        this.showAlert(
          'Resource not available',
          `It seems the resource you requested is either not available or you don't have the permission to access it.`,
        );
        break;
      case 504:
      case 500:
        this.showAlert(
          'Service not available',
          'We are very sorry, it seems there is a problem with our servers. Please contact your administrator if the problem occurs.',
        );
        break;
      default:
        break;
    }
  }

  private showMessage(message: string, config: MatSnackBarConfig): void {
    const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(message, '', config);
    setTimeout(() => snackBarRef.dismiss(), 3000);
  }

  private showAlert(title: string = '', message: string): void {
    const closeText = 'OK';
    this.dialogService.openAlert({
      message: message,
      viewContainerRef: this.viewContainerRef,
      title: title,
      closeButton: closeText,
    });
  }
}
