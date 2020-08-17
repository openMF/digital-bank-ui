import { Component } from '@angular/core';
import { TaskDefinition } from '../../../../services/customer/domain/task-definition.model';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromCustomer from '../../store/index';
import * as fromCustomers from '../../store';
import { Store } from '@ngrx/store';
import { UPDATE } from '../../store/tasks/task.actions';

@Component({
  templateUrl: './edit.form.component.html',
})
export class TaskEditFormComponent {
  task$: Observable<TaskDefinition>;

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<fromCustomers.State>) {
    this.task$ = this.store.select(fromCustomer.getSelectedTask);
  }

  onSave(task: TaskDefinition): void {
    this.store.dispatch({
      type: UPDATE,
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
