import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
})
export class BackButtonComponent implements OnInit {
  @Input() navigateBackTo: string[];

  constructor() {}

  ngOnInit(): void {}
}
