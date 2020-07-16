import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITdLoadingConfig, LoadingType, TdLoadingService } from '@covalent/core/loading';
import * as fromRoot from '../store';
import { Store } from '@ngrx/store';
import { LoginAction } from '../store/security/security.actions';
import { Subscription, Observable } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';

@Component({
  selector: 'ngx-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  private loadingSubscription: Subscription;
  error$: Observable<string>;

  constructor(private _loadingService: TdLoadingService, private formBuilder: FormBuilder, private store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    const options: ITdLoadingConfig = {
      name: 'login',
      type: LoadingType.Circular,
    };

    this._loadingService.create(options);

    this.loginForm = this.formBuilder.group({
      tenant: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.error$ = this.store.select(fromRoot.getAuthenticationError).pipe(
      filter(error => !!error),
      tap(() => this.loginForm.get('password').setValue('')),
      map(error => 'Sorry, that login did not work.'),
    );

    this.loadingSubscription = this.store.select(fromRoot.getAuthenticationLoading).subscribe(loading => {
      if (loading) {
        this._loadingService.register('login');
      } else {
        this._loadingService.resolve('login');
      }
    });
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

  login(): void {
    const tenant = this.loginForm.get('tenant').value;
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    const payload = {
      username,
      password,
      tenant,
    };

    this.store.dispatch(new LoginAction(payload));
  }

  get tenant() {
    return this.loginForm.get('tenant');
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
