import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CustomerService } from '../../../../../../services/customer/customer.service';

@Component({
  template: '<img [src]="safeUrl" style="width: 600px; height: auto;" alt/>',
})
export class ImageComponent implements OnInit, OnDestroy {
  customerIdentifier: any;
  idCardNumber: any;
  identifier: any;
  objectUrl: string;
  safeUrl: any;

  constructor(private domSanitizer: DomSanitizer, private customerService: CustomerService) {}

  ngOnDestroy(): void {
    URL.revokeObjectURL(this.objectUrl);
  }

  ngOnInit(): void {
    this.customerService.getIdentificationCardScanImage(this.customerIdentifier, this.idCardNumber, this.identifier).subscribe(data => {
      this.safeUrl = this.getSafeUrl(URL.createObjectURL(data));
    });
  }

  getSafeUrl(url: string): SafeUrl {
    this.objectUrl = url;
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }
}
