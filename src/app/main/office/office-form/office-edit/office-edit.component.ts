import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Office } from '../../../../services/office/domain/office.model';
import { getSelectedOffice } from '../../store';
import * as fromOffice from '../../store';
import { Store } from '@ngrx/store';
import { UPDATE } from '../../store/office.actions';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'ngx-office-edit',
  templateUrl: './office-edit.component.html',
  styleUrls: ['./office-edit.component.scss'],
})
export class EditOfficeFormComponent implements OnInit, OnDestroy {
  private officeSubscription: Subscription;

  office: Office;

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<fromOffice.State>) {}

  ngOnInit() {
    this.officeSubscription = this.store.select(getSelectedOffice).subscribe((office: Office) => (this.office = office));
  }

  ngOnDestroy(): void {
    this.officeSubscription.unsubscribe();
  }

  onSave(office: Office) {
    office.parentIdentifier = this.office.parentIdentifier;
    this.store.dispatch({
      type: UPDATE,
      payload: {
        office,
        activatedRoute: this.route,
      },
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
