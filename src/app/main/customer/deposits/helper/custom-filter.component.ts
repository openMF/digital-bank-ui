import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DefaultFilter } from 'ng2-smart-table';

@Component({
  templateUrl: './custom-filter.component.html',
})
export class CustomSelectorFilterComponent extends DefaultFilter implements OnInit, OnChanges {
  inputControl = new FormControl();
  statusType = ['ACTIVE', 'PENDING'];

  constructor() {
    super();
  }

  ngOnInit() {
    this.inputControl.valueChanges.pipe(distinctUntilChanged(), debounceTime(this.delay)).subscribe((value: any) => {
      this.query = value !== null ? this.inputControl.value : '';
      this.setFilter();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.query) {
      this.query = changes.query.currentValue;
      this.inputControl.setValue(this.query);
    }
  }
}
