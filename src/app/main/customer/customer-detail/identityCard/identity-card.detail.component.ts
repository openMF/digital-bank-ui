import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import * as fromCustomers from '../../store/index';
import { Store } from '@ngrx/store';
import { Customer } from '../../../../services/customer/domain/customer.model';
import { DELETE } from '../../store/identityCards/identity-cards.actions';
import { CREATE, DELETE as DELETE_SCAN, LoadAllAction } from '../../store/identityCards/scans/scans.actions';
import { ActivatedRoute } from '@angular/router';
import { IdentificationCard } from '../../../../services/customer/domain/identification-card.model';
import { Observable, combineLatest } from 'rxjs';
import { IdentificationCardScan } from '../../../../services/customer/domain/identification-card-scan.model';
import { UploadIdentificationCardScanEvent } from './scans/scan.list.component';
import { ImageComponent } from './helper/image-dialog/image.component';
import { NbDialogService } from '@nebular/theme';
import { filter, tap, map } from 'rxjs/operators';
import { DeleteDialogComponent } from '../../../common/delete-dialog/delete-dialog.component';

@Component({
  templateUrl: './identity-card.detail.component.html',
  styleUrls: ['./identity-card.detail.component.scss'],
})
export class CustomerIdentityCardDetailComponent implements OnInit, OnDestroy {
  private actionSubscription: Subscription;

  private customer: Customer;

  identificationCard: IdentificationCard;

  scans$: Observable<IdentificationCardScan[]>;

  constructor(private route: ActivatedRoute, private customersStore: Store<fromCustomers.State>, private dialogService: NbDialogService) {}

  ngOnInit(): void {
    this.scans$ = this.customersStore.select(fromCustomers.getAllIdentificationCardScanEntities);

    this.actionSubscription = combineLatest(
      this.customersStore.select(fromCustomers.getSelectedIdentificationCard).pipe(filter(identificationCard => !!identificationCard)),
      this.customersStore.select(fromCustomers.getSelectedCustomer),
      (identificationCard, customer) => ({
        identificationCard,
        customer,
      }),
    )
      .pipe(
        tap(result => (this.customer = result.customer)),
        tap(result => (this.identificationCard = result.identificationCard)),
        map(
          result =>
            new LoadAllAction({
              customerIdentifier: result.customer.identifier,
              identificationCardNumber: result.identificationCard.number,
            }),
        ),
      )
      .subscribe(this.customersStore);
  }

  ngOnDestroy(): void {
    this.actionSubscription.unsubscribe();
  }

  deleteIdentificationCard(): void {
    this.dialogService
      .open(DeleteDialogComponent, {
        context: {
          title: 'identification card',
        },
      })
      .onClose.subscribe(value => {
        if (value) {
          this.customersStore.dispatch({
            type: DELETE,
            payload: {
              customerId: this.customer.identifier,
              identificationCard: this.identificationCard,
              activatedRoute: this.route,
            },
          });
        }
      });
  }

  viewScan(identifier: string): void {
    const customerIdentifier = this.customer.identifier;
    this.dialogService.open(ImageComponent, {
      context: {
        customerIdentifier: customerIdentifier,
        idCardNumber: this.identificationCard.number,
        identifier: identifier,
      },
    });
  }

  uploadScan(event: UploadIdentificationCardScanEvent): void {
    this.customersStore.dispatch({
      type: CREATE,
      payload: {
        customerIdentifier: this.customer.identifier,
        identificationCardNumber: this.identificationCard.number,
        scan: event.scan,
        file: event.file,
      },
    });
  }

  deleteScan(scan: IdentificationCardScan): void {
    this.dialogService
      .open(DeleteDialogComponent, {
        context: {
          title: 'identification card',
        },
      })
      .onClose.subscribe(value => {
        if (value) {
          this.customersStore.dispatch({
            type: DELETE_SCAN,
            payload: {
              customerIdentifier: this.customer.identifier,
              identificationCardNumber: this.identificationCard.number,
              scan,
            },
          });
        }
      });
  }
}
