import { map } from 'rxjs/operators';

import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { FimsPermission } from './fims-permission.model';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store';
import { Subscription } from 'rxjs';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[hasPermission]',
})
export class PermissionDirective implements OnInit, OnDestroy {
  private permissionSubscription: Subscription;

  @Input('hasPermission') hasPermission: FimsPermission;

  constructor(private store: Store<fromRoot.State>, private viewContainer: ViewContainerRef, private template: TemplateRef<Object>) {}

  ngOnInit(): void {
    this.viewContainer.clear();

    if (!this.hasPermission) {
      this.viewContainer.createEmbeddedView(this.template);
      return;
    }

    this.permissionSubscription = this.store
      .select(fromRoot.getPermissions)
      .pipe(
        map(permissions =>
          permissions.filter(
            permission => permission.id === this.hasPermission.id && permission.accessLevel === this.hasPermission.accessLevel,
          ),
        ),
        map(matches => matches.length > 0),
      )
      .subscribe(hasPermission => {
        this.viewContainer.clear();
        if (hasPermission) {
          this.viewContainer.createEmbeddedView(this.template);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.permissionSubscription) {
      this.permissionSubscription.unsubscribe();
    }
  }
}
