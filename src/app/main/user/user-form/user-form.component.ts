import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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

  @Input() title: string;

  @Output() onSave = new EventEmitter<UserWithPassword>();
  @Output() onCancel = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder, private store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.roles = this.store.select(fromRoot.getRoleSearchResults).pipe(map(rolesPage => rolesPage.roles));
    this.fetchRoles();
  }

  prepareForm(user: User): void {
    const passwordValidators: ValidatorFn[] = [Validators.minLength(8)];

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
}
