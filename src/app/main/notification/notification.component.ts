import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { NbToastrService } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { NotificationEvent, NotificationService, NotificationType } from '../../services/notification/notification.service';
import { HttpClientService } from '../../services/http/http.service';

@Component({
  selector: 'ngx-notification',
  template: `
    <ng-template #dialog let-data let-ref="dialogRef">
      <nb-card>
        <nb-card-header>{{ data.title }}</nb-card-header>
        <nb-card-body>{{ data.body }}</nb-card-body>
        <nb-card-footer>
          <button nbButton matRipple (click)="ref.close()">OK</button>
        </nb-card-footer>
      </nb-card>
    </ng-template>
  `,
})
export class NotificationComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('dialog')
  private dialogTmp: TemplateRef<any>;

  private notificationSubscription: Subscription;
  private errorSubscription: Subscription;

  constructor(
    private notificationService: NotificationService,
    private httpClient: HttpClientService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
  ) {}

  ngOnInit(): void {
    this.notificationSubscription = this.notificationService.notifications$.subscribe((notification: NotificationEvent) =>
      this.showNotification(notification),
    );
  }

  ngOnDestroy(): void {
    this.notificationSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.errorSubscription = this.httpClient.error.subscribe((error: any) => this.showError(error));
  }

  private showNotification(notification: NotificationEvent): void {
    switch (notification.type) {
      case NotificationType.MESSAGE:
        this.showMessage('Message', notification.message);
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

  private showMessage(title: string = '', message: string): void {
    this.toastrService.show(message, title);
  }

  private showAlert(title: string = '', message: string): void {
    this.dialogService.open(this.dialogTmp, {
      context: {
        title: title,
        body: message,
      },
    });
  }
}
