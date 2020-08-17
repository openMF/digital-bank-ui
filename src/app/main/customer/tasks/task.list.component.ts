import { ActivatedRoute, Router } from '@angular/router';
import * as fromCustomers from '../store';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TaskDefinition, TaskDefinitionType } from '../../../services/customer/domain/task-definition.model';
import { LOAD_ALL } from '../store/tasks/task.actions';
import { defaultTypeOptions } from './domain/type-options.model';
import { LocalDataSource } from 'ng2-smart-table';
import { CustomTypeRenderComponent } from './helper/custom-type-render.component';
import { CustomIconRenderComponent } from './helper/custom-icon-render.component';

@Component({
  templateUrl: './task.list.component.html',
  styleUrls: ['./task.list.component.scss'],
})
export class TaskListComponent {
  /** Data source for table */
  source: LocalDataSource = new LocalDataSource();

  /** Tasks data */
  tasksData: {
    data: any;
    totalPages: number;
    totalElements: number;
  };

  /** Loading property  */
  loading: any;

  /** Settings for smart-table */
  settings = {
    actions: false,
    columns: {
      identifier: {
        title: 'ID',
      },
      name: {
        title: 'Name',
      },
      mandatory: {
        title: 'Mandatory',
        filter: false,
        type: 'custom',
        renderComponent: CustomIconRenderComponent,
      },
      predefined: {
        title: 'Auto assign?',
        filter: false,
        type: 'custom',
        renderComponent: CustomIconRenderComponent,
      },
      type: {
        title: 'Type',
        type: 'custom',
        renderComponent: CustomTypeRenderComponent,
      },
    },
    mode: 'external',
  };

  title: string;

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<fromCustomers.State>) {
    this.route.data.subscribe((data: any) => {
      this.title = data.title;
    });
    this.store.select(fromCustomers.getAllTaskEntities).subscribe(tasks => this.setTasksData(tasks));
    this.fetchTasks();
  }

  formatType(data: any[]): any[] {
    data.forEach(task => (task.type = defaultTypeOptions.find(option => option.type === task.type).label));
    return data;
  }

  setTasksData(tasks: any) {
    const data = {
      data: tasks,
      totalElements: tasks.length,
      totalPages: 1,
    };
    this.tasksData = data;
    this.source.load(tasks);
  }

  fetchTasks(): void {
    this.store.dispatch({
      type: LOAD_ALL,
    });
  }

  onTaskRowSelect(event: any): void {
    const task = event.data;
    this.router.navigate(['detail', task.identifier], { relativeTo: this.route });
  }
}
