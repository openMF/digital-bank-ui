import { Component, Input } from '@angular/core';
import { FormPermission } from '../../model/form-permission.model';

@Component({
  selector: 'ngx-permission-list-item',
  templateUrl: './permission-list-item.component.html',
  styleUrls: ['./permission-list-item.component.scss'],
})
export class PermissionListItemComponent {
  @Input() formPermission: FormPermission;
}
