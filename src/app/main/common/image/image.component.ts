import { Component, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  template: '<img [src]="safeUrl" alt/>',
})
export class ImageComponent implements OnDestroy {
  blob: Blob;
  objectUrl: string;

  constructor(private domSanitizer: DomSanitizer) {
    this.objectUrl = URL.createObjectURL(this.blob);
  }

  ngOnDestroy(): void {
    URL.revokeObjectURL(this.objectUrl);
  }

  get safeUrl(): SafeUrl {
    return this.domSanitizer.bypassSecurityTrustUrl(this.objectUrl);
  }
}
