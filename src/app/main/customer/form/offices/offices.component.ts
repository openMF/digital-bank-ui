import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Office } from '../../../../services/office/domain/office.model';
import { FetchRequest } from '../../../../services/domain/paging/fetch-request.model';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../../store';
import { SEARCH } from '../../../../store/office/office.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ngx-customer-offices-form',
  templateUrl: './offices.component.html',
})
export class CustomerOfficesComponent implements OnInit {
  offices: Observable<Office[]>;

  @Input() preSelection: string;

  @Output() onSelectionChange = new EventEmitter<string[]>();

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.offices = this.store.select(fromRoot.getOfficeSearchResults).pipe(map(officePage => officePage.offices));
  }

  search(searchTerm) {
    const fetchRequest: FetchRequest = {
      searchTerm,
    };

    this.store.dispatch({ type: SEARCH, payload: fetchRequest });
  }

  select(selections: string[]): void {
    this.onSelectionChange.emit(selections);
  }
}
