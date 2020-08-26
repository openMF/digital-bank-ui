import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-command-display',
  templateUrl: './command-display.component.html',
})
export class CommandDisplayComponent {
  @Input() command: any;
}
