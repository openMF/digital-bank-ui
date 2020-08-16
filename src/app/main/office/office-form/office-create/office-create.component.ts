import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfficeFormComponent } from '../office-form.component';
import { Office } from '../../../../services/office/domain/office.model';
import * as fromOffice from '../../store';
import { CREATE, CREATE_BRANCH, RESET_FORM } from '../../store/office.actions';
import { Error } from '../../../../services/domain/error.model';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'ngx-office-create',
  templateUrl: './office-create.component.html',
  styleUrls: ['./office-create.component.scss'],
})
export class CreateOfficeFormComponent implements OnInit, OnDestroy {
  private formStateSubscription: Subscription;

  private parentIdentifier: string;

  office: Office = { identifier: '', parentIdentifier: '', name: '' };

  @ViewChild('form') formComponent: OfficeFormComponent;

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<fromOffice.State>) {
    this.formStateSubscription = store
      .select(fromOffice.getOfficeFormError)
      .pipe(filter((error: Error) => !!error))
      .subscribe((error: Error) => {
        const officeDetailForm = this.formComponent.detailForm;
        const errors = officeDetailForm.get('identifier').errors || {};
        errors['unique'] = true;
        officeDetailForm.get('identifier').setErrors(errors);
        // this.formComponent.step.open();
      });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      this.parentIdentifier = queryParams['parentId'];
    });
  }

  ngOnDestroy(): void {
    this.formStateSubscription.unsubscribe();

    this.store.dispatch({ type: RESET_FORM });
  }

  onSave(office: Office): void {
    if (this.parentIdentifier) {
      office.parentIdentifier = this.parentIdentifier;
      this.store.dispatch({
        type: CREATE_BRANCH,
        payload: {
          office,
          activatedRoute: this.route,
        },
      });
    } else {
      this.store.dispatch({
        type: CREATE,
        payload: {
          office,
          activatedRoute: this.route,
        },
      });
    }
  }

  onCancel(): void {
    this.navigateAway();
  }

  navigateAway(): void {
    if (this.parentIdentifier) {
      this.router.navigate(['../detail', this.parentIdentifier], { relativeTo: this.route });
    } else {
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }
}
