import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { CustomerService } from '../../../../../services/customer/customer.service';
import { Subscription } from 'rxjs/Subscription';
import { Customer } from '../../../../../services/customer/domain/customer.model';
import { Store } from '@ngrx/store';
import * as fromCustomers from '../../../store';
import { NotificationService, NotificationType } from '../../../../../services/notification/notification.service';

@Component({
  selector: 'ngx-portrait-dialog',
  templateUrl: './portrait-dialog.component.html',
  styleUrls: ['./portrait-dialog.component.scss'],
})
export class PortraitDialogComponent implements OnInit, OnDestroy {
  private customerSubscription: Subscription;
  private customer: Customer;
  picture_exists: boolean;

  invalidSize = false;

  constructor(
    private customerService: CustomerService,
    private store: Store<fromCustomers.State>,
    private notificationService: NotificationService,
    private dialogRef: NbDialogRef<PortraitDialogComponent>,
  ) {}

  ngOnInit(): void {
    this.customerSubscription = this.store.select(fromCustomers.getSelectedCustomer).subscribe(customer => (this.customer = customer));
  }

  ngOnDestroy(): void {
    this.customerSubscription.unsubscribe();
  }

  onFileSelect(event: any) {
    this.uploadEvent(event.target.files[0]);
  }

  selectEvent(file: File): void {
    this.invalidSize = file.size > 524288;
  }

  uploadEvent(file: File): void {
    if (this.invalidSize) {
      this.notificationService.send({
        type: NotificationType.MESSAGE,
        message: 'File size should be less than 512 KB.',
      });
    }

    this.customerService.uploadPortrait(this.customer.identifier, file).subscribe(() => {
      this.notificationService.send({
        type: NotificationType.MESSAGE,
        message: 'Portrait is going to be uploaded',
      });
      this.dialogRef.close('upload');
    });
  }

  cancel() {
    this.dialogRef.close('cancel');
  }

  delete() {
    this.dialogRef.close('delete');
  }
}
