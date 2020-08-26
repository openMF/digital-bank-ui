import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IdentificationCardScan } from '../../../../../services/customer/domain/identification-card-scan.model';
import { FormGroup } from '@angular/forms';

export interface UploadIdentificationCardScanEvent {
  scan: IdentificationCardScan;
  file: File;
}

@Component({
  selector: 'ngx-identification-card-scan-list',
  templateUrl: './scan.list.component.html',
})
export class CustomerIdentityCardScanListComponent {
  @Input() scans: IdentificationCardScan[];

  @Output() onView: EventEmitter<string> = new EventEmitter();

  @Output() onDelete: EventEmitter<IdentificationCardScan> = new EventEmitter();

  formGroup: FormGroup;

  constructor() {}

  viewScan(identifier: string): void {
    this.onView.emit(identifier);
  }

  deleteScan(scan: IdentificationCardScan): void {
    this.onDelete.emit(scan);
  }
}
