import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskDefinition, TaskDefinitionCommand } from '../../../../services/customer/domain/task-definition.model';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FimsValidators } from '../../../common/validator/validators';
import { defaultTypeOptions } from '../domain/type-options.model';
import { defaultCommandOptions } from '../domain/command-options.model';

@Component({
  selector: 'ngx-task-form-component',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class TaskFormComponent implements OnInit, OnChanges {
  form: FormGroup;
  title: String;

  typeOptions = defaultTypeOptions;

  commandOptions = defaultCommandOptions;

  @Input('task') task: TaskDefinition;

  @Input('editMode') editMode: boolean;

  @Output() onSave = new EventEmitter<TaskDefinition>();

  @Output() onCancel = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.form = formBuilder.group({
      identifier: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32), FimsValidators.urlSafe]],
      type: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(4096)]],
      name: ['', [Validators.required, Validators.maxLength(256)]],
      mandatory: ['', [Validators.required]],
      commands: this.initCommands([]),
      predefined: ['', [Validators.required]],
    });
  }

  get name() {
    return this.form.get('name');
  }

  get description() {
    return this.form.get('description');
  }

  get type() {
    return this.form.get('type');
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: any) => {
      this.title = data.title;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.task) {
      this.form.reset({
        identifier: this.task.identifier,
        type: this.task.type,
        description: this.task.description,
        name: this.task.name,
        mandatory: this.task.mandatory,
        predefined: this.task.predefined,
      });

      this.task.commands.forEach(command => this.addCommand(command));
    }
  }

  save() {
    const formCommands = this.form.get('commands').value;
    const commands: TaskDefinitionCommand[] = formCommands.map(command => command.command);

    const task: TaskDefinition = {
      identifier: this.form.get('identifier').value,
      type: this.form.get('type').value,
      description: this.form.get('description').value,
      name: this.form.get('name').value,
      mandatory: this.form.get('mandatory').value,
      commands,
      predefined: this.form.get('predefined').value,
    };

    this.onSave.emit(task);
  }

  cancel() {
    this.onCancel.emit();
  }

  private initCommands(commands: TaskDefinitionCommand[]): FormArray {
    const formControls: FormGroup[] = [];
    commands.forEach(value => formControls.push(this.initCommand(value)));
    return this.formBuilder.array(formControls);
  }

  private initCommand(value?: TaskDefinitionCommand): FormGroup {
    return this.formBuilder.group({
      command: [value ? value : '', Validators.required],
    });
  }

  addCommand(value?: TaskDefinitionCommand): void {
    const commands: FormArray = this.form.get('commands') as FormArray;
    commands.push(this.initCommand(value));
  }

  removeCommand(index: number): void {
    const commands: FormArray = this.form.get('commands') as FormArray;
    commands.removeAt(index);
  }

  get commands(): AbstractControl[] {
    const commands: FormArray = this.form.get('commands') as FormArray;
    return commands.controls;
  }
}
