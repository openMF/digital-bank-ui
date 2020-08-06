import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOfficeFormComponent } from './office-edit.component';

describe('EditOfficeFormComponent', () => {
  let component: EditOfficeFormComponent;
  let fixture: ComponentFixture<EditOfficeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditOfficeFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOfficeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
