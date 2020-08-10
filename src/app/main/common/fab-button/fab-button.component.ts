import { Component, Input, OnInit } from '@angular/core';
import { FimsPermission } from '../../../services/security/authz/fims-permission.model';

@Component({
  selector: 'ngx-fab-button',
  templateUrl: './fab-button.component.html',
  styleUrls: ['./fab-button.component.scss'],
})
export class FabButtonComponent implements OnInit {
  @Input() title: string;

  @Input() icon: string;

  @Input() link: any[];

  @Input() permission: FimsPermission;

  @Input() disabled = false;

  @Input() status: string;

  @Input() tooltip: string;

  constructor() {}

  ngOnInit() {}
}
