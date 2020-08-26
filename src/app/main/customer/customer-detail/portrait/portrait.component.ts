import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomerService } from '../../../../services/customer/customer.service';
import { Subscription } from 'rxjs/Subscription';
import { Customer } from '../../../../services/customer/domain/customer.model';
import { Store } from '@ngrx/store';
import * as fromCustomers from '../../store';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService, NotificationType } from '../../../../services/notification/notification.service';
import { NbDialogService } from '@nebular/theme';
import { tap, flatMap } from 'rxjs/operators';
import { DeleteDialogComponent } from '../../../common/delete-dialog/delete-dialog.component';

@Component({
  templateUrl: './portrait.component.html',
})
export class CustomerPortraitComponent implements OnInit, OnDestroy {
  private customerSubscription: Subscription;

  private customer: Customer;

  fileSelectMsg = 'No file selected yet.';

  invalidSize = false;

  portrait: Blob;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private store: Store<fromCustomers.State>,
    private notificationService: NotificationService,
    private dialogService: NbDialogService,
  ) {}

  ngOnInit(): void {
    this.customerSubscription = this.store
      .select(fromCustomers.getSelectedCustomer)
      .pipe(
        tap(customer => (this.customer = customer)),
        flatMap(customer => this.customerService.getPortrait(customer.identifier)),
      )
      .subscribe(portrait => (this.portrait = portrait));
  }

  ngOnDestroy(): void {
    this.customerSubscription.unsubscribe();
  }

  selectEvent(file: File): void {
    this.invalidSize = file.size > 524288;
    this.fileSelectMsg = file.name;
  }

  uploadEvent(file: File): void {
    if (this.invalidSize) {
      return;
    }

    this.customerService.uploadPortrait(this.customer.identifier, file).subscribe(() => {
      this.notificationService.send({
        type: NotificationType.MESSAGE,
        message: 'Portrait is going to be uploaded',
      });
      this.navigateAway();
    });
  }

  deletePortrait(): void {
    this.dialogService
      .open(DeleteDialogComponent, {
        context: {
          title: 'portrait',
        },
      })
      .onClose.subscribe(value => {
        if (value) {
          this.customerService.deletePortrait(this.customer.identifier).subscribe(() => {
            this.notificationService.send({
              type: NotificationType.MESSAGE,
              message: 'Portrait is going to be deleted',
            });
            this.navigateAway();
          });
        }
      });
  }

  navigateAway(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
