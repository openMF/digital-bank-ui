import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'ngx-select-list',
  templateUrl: './select-list.component.html',
})
export class SelectListComponent implements OnInit {
  selections: string[];

  term = new FormControl();

  @Input('preSelection') set preSelection(preSelection: string | string[]) {
    preSelection = preSelection || [];
    const selections: string[] = Array.isArray(preSelection) ? preSelection : [preSelection];
    this.selections = selections;
  }

  @Input('listIcon') listIcon: string;

  @Input('noResultsMessage') noResultsMessage: string;

  @Input('noSelectionMessage') noSelectionMessage: string;

  @Input('data') data: Observable<any[]>;

  @Input('id') id: string;

  @Input('title') title: string;

  @Input('multiple') multiple = false;

  @Output() onSearch = new EventEmitter<string>();

  @Output() onSelectionChange = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    this.term.valueChanges.pipe(debounceTime(500)).subscribe(event => this.onSearch.emit(event));
  }

  doSelect(id: any): void {
    if (this.selections.indexOf(id) > -1) {
      return;
    }

    if (this.multiple) {
      this.selections.push(id);
    } else {
      this.selections = [id];
    }

    this.onSelectionChange.emit(this.selections);
  }

  doDeselect(id: any): void {
    const index = this.selections.indexOf(id);

    if (index > -1) {
      this.selections.splice(index, 1);
    }

    this.onSelectionChange.emit(this.selections);
  }
}
