import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-id-input',
  templateUrl: './id-input.component.html',
})
export class IdInputComponent implements OnInit {
  @Input() controlName: string;

  @Input() form: FormGroup;

  @Input() readonly: boolean;

  @Input() placeholder = 'Identifier';

  constructor() {}

  ngOnInit() {}
}
