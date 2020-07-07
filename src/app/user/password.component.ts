import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FimsValidators } from '../common/validator/validators';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../store';
import { CHANGE_PASSWORD } from '../store/security/security.actions';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'ngx-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent implements OnInit, OnDestroy {
  private usernameSubscription: Subscription;

  private passwordErrorSubscription: Subscription;

  private currentUser: string;

  passwordForm: FormGroup;

  error: string;

  forced: boolean;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.route.queryParams.subscribe(queryParams => {
      this.forced = queryParams['forced'] === 'true';
    });

    this.usernameSubscription = this.store.select(fromRoot.getUsername).subscribe(username => (this.currentUser = username));

    this.passwordErrorSubscription = this.store
      .select(fromRoot.getPasswordError)
      .pipe(filter(error => !!error))
      .subscribe(error => (this.error = 'There was an error changing your password'));

    this.passwordForm = this.createFormGroup();
  }

  ngOnDestroy(): void {
    this.usernameSubscription.unsubscribe();
    this.passwordErrorSubscription.unsubscribe();
  }

  private createFormGroup(): FormGroup {
    return this.formBuilder.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmNewPassword: ['', Validators.required],
      },
      { validator: FimsValidators.matchValues('newPassword', 'confirmNewPassword') },
    );
  }

  get newPassword() {
    return this.passwordForm.get('newPassword');
  }

  get confirmNewPassword() {
    return this.passwordForm.get('confirmNewPassword');
  }

  changePassword() {
    const newPassword: string = this.passwordForm.get('newPassword').value;

    this.store.dispatch({
      type: CHANGE_PASSWORD,
      payload: {
        username: this.currentUser,
        password: newPassword,
      },
    });
  }
}
