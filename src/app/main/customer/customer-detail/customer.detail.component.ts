import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Customer } from '../../../services/customer/domain/customer.model';
import { Catalog } from '../../../services/catalog/domain/catalog.model';
import * as fromCustomers from '../store';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { CustomerService } from '../../../services/customer/customer.service';
import { Observable } from 'rxjs';
import { tap, filter, flatMap } from 'rxjs/operators';
import { NbDialogService } from '@nebular/theme';
import { PortraitDialogComponent } from './helper/portrait-dialog/portrait-dialog.component';
import { NotificationService, NotificationType } from '../../../services/notification/notification.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { DeleteDialogComponent } from '../../common/delete-dialog/delete-dialog.component';

@Component({
  templateUrl: './customer.detail.component.html',
  styleUrls: ['./customer.detail.component.scss'],
})
export class CustomerDetailComponent implements OnInit, OnDestroy {
  private customerSubscription$: Subscription;
  private objectUrl: string;
  private portrait: Blob;
  private defaultUrl = '../../../../assets/images/ic_account_circle_black_48dp_2x.png';
  customer: Customer;
  catalog$: Observable<Catalog>;
  isCustomerActive: boolean;
  safeUrl: SafeUrl;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromCustomers.State>,
    private customerService: CustomerService,
    private dialogService: NbDialogService,
    private notificationService: NotificationService,
    private domSanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.customerSubscription$ = this.store
      .select(fromCustomers.getSelectedCustomer)
      .pipe(
        filter(customer => !!customer),
        tap(customer => (this.customer = customer)),
        tap(customer => (this.isCustomerActive = customer.currentState === 'ACTIVE')),
        flatMap(customer => this.customerService.getPortrait(customer.identifier)),
      )
      .subscribe(portrait => this.setBlob(portrait));

    this.catalog$ = this.store.select(fromCustomers.getCustomerCatalog);
  }

  ngOnDestroy(): void {
    this.customerSubscription$.unsubscribe();
    if (this.objectUrl) {
      URL.revokeObjectURL(this.objectUrl);
    }
  }

  setBlob(blob: Blob) {
    this.portrait = blob;
    if (blob && blob.size) {
      this.safeUrl = this.getSafeUrl(URL.createObjectURL(blob));
    } else {
      this.safeUrl = this.getSafeUrl(this.defaultUrl);
    }
  }

  getSafeUrl(url: string): SafeUrl {
    this.objectUrl = url;
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  get blob(): boolean {
    if (this.portrait && this.portrait.size) return true;
    else return false;
  }

  changePortrait(): void {
    this.dialogService
      .open(PortraitDialogComponent, {
        context: {
          picture_exists: this.blob,
        },
      })
      .onClose.subscribe(value => {
        if (value === 'delete') {
          this.dialogService
            .open(DeleteDialogComponent, {
              context: {
                title: 'portrait',
              },
            })
            .onClose.subscribe(data => {
              if (data) {
                this.customerService.deletePortrait(this.customer.identifier).subscribe(() => {
                  this.notificationService.send({
                    type: NotificationType.MESSAGE,
                    message: 'Portrait is going to be deleted',
                  });
                });
              }
              this.safeUrl = this.getSafeUrl(this.defaultUrl);
              this.portrait = null;
            });
        }
        if (value === 'upload') {
          this.customerService.getPortrait(this.customer.identifier).subscribe(portrait => this.setBlob(portrait));
        }
      });
  }

  goToTasks(): void {
    this.router.navigate(['tasks'], { relativeTo: this.route });
  }
}
