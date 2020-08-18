import { Component } from '@angular/core';
import { TaskDefinition } from '../../../../services/customer/domain/task-definition.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromCustomers from '../../store';
import { CREATE } from '../../store/tasks/task.actions';

@Component({
  templateUrl: './create.form.component.html',
})
export class TaskCreateFormComponent {
  task: TaskDefinition = {
    identifier: '',
    name: '',
    description: '',
    type: 'ID_CARD',
    commands: ['ACTIVATE'],
    mandatory: false,
    predefined: false,
  };

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<fromCustomers.State>) {}

  onSave(task: TaskDefinition): void {
    this.store.dispatch({
      type: CREATE,
      payload: {
        task,
        activatedRoute: this.route,
      },
    });
  }

  onCancel(): void {
    this.navigateAway();
  }

  navigateAway(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
