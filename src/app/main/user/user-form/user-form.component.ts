import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from '../../../services/identity/domain/role.model';
import { User } from '../../../services/identity/domain/user.model';
import { UserWithPassword } from '../../../services/identity/domain/user-with-password.model';
import { FimsValidators } from '../../common/validator/validators';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store/index';
import { SEARCH as SEARCH_ROLE } from '../../../store/role/role.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ngx-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  roles: Observable<Role[]>;

  detailForm: FormGroup;

  @Input() editMode: boolean;

  @Input('user') set user(user: User) {
    this.prepareForm(user);
  }

  title: String;
  feedbackArr: Array<Object> = [];

  @Output() onSave = new EventEmitter<UserWithPassword>();
  @Output() onCancel = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder, private store: Store<fromRoot.State>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: any) => {
      this.title = data.title;
    });
    this.roles = this.store.select(fromRoot.getRoleSearchResults).pipe(map(rolesPage => rolesPage.roles));
    this.fetchRoles();
  }

  prepareForm(user: User): void {
    const passwordValidators: ValidatorFn[] = [Validators.minLength(8), Validators.pattern(/[A-Z]/),
    Validators.pattern(/[a-z]/), Validators.pattern(/[0-9]/), Validators.pattern(/[!@#$%*]/)];

    if (!this.editMode) {
      passwordValidators.push(Validators.required);
    }
    this.detailForm = this.formBuilder.group({
      identifier: [user.identifier, [Validators.required, Validators.minLength(3), Validators.maxLength(32), FimsValidators.urlSafe]],
      password: ['', passwordValidators],
      role: [user ? user.role : '', Validators.required],
    });
  }

  get role() {
    return this.detailForm.get('role');
  }

  get password() {
    return this.detailForm.get('password');
  }

  formsInvalid(): boolean {
    return this.detailForm.invalid;
  }

  save(): void {
    this.onSave.emit(this.detailForm.value);
  }

  cancel(): void {
    this.onCancel.emit();
  }

  fetchRoles(): void {
    this.store.dispatch({ type: SEARCH_ROLE });
  }

  isLengthMet(password: string): boolean {
    if (password.length >= 8) {
      this.feedbackArr.push({'label': `Minimum 8 characters`, status: true});
      return true;
    } else {
      this.feedbackArr.push({'label': `Minimum 8 characters`, status: false});
      return false;
    }
  }
  isSpecialCharMet(password: string): boolean {
    if ( (/[!@#$%*]/).test(password) ) {
      this.feedbackArr.push({'label': `One special characters`, status: true});
      return true;
    } else {
      this.feedbackArr.push({'label': `One special characters`, status: false});
      return false;
    }
  }
  isNumberMet(password: string): boolean {
    if ( (/[0-9]/).test(password) ) {
      this.feedbackArr.push({'label': `One number`, status: true});
      return true;
    } else {
      this.feedbackArr.push({'label': `One number`, status: false});
      return false;
    }
  }
  isSmallcaseMet(password: string): boolean {
    if ( (/[a-z]/).test(password) ) {
      this.feedbackArr.push({'label': `One smallcase character`, status: true});
      return true;
    } else {
      this.feedbackArr.push({'label': `One smallcase character`, status: false});
      return false;
    }
  }
  isUppercaseMet(password: string): boolean {
    if ( (/[A-Z]/).test(password) ) {
      this.feedbackArr.push({'label': `One uppercase character`, status: true});
      return true;
    } else {
      this.feedbackArr.push({'label': `One uppercase character`, status: false});
      return false;
    }
  }

  onCustomerPasswordStrength(data: any): void {
    this.feedbackArr = [];
    this.isLengthMet(data);
    this.isNumberMet(data);
    this.isSmallcaseMet(data);
    this.isUppercaseMet(data);
    this.isSpecialCharMet(data);
  }
}
