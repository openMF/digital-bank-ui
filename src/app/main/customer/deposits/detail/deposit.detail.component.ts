import { Component, OnInit } from '@angular/core';
import { ProductInstance } from '../../../../services/depositAccount/domain/instance/product-instance.model';
import { Observable } from 'rxjs/Observable';
import * as fromDeposits from '../store/index';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './deposit.detail.component.html',
  styleUrls: ['./deposit.detail.component.scss'],
})
export class DepositDetailComponent implements OnInit {
  depositInstance$: Observable<ProductInstance>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromDeposits.State>,
  ) {}

  ngOnInit(): void {
    this.depositInstance$ = this.store.select(
      fromDeposits.getSelectedDepositInstance,
    );
  }

  issueCheques(): void {
    this.router.navigate(['cheques'], { relativeTo: this.route });
  }
}
