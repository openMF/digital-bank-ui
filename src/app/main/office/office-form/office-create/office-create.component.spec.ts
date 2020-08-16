import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOfficeFormComponent } from './office-create.component';

describe('CreateOfficeFormComponent', () => {
  let component: CreateOfficeFormComponent;
  let fixture: ComponentFixture<CreateOfficeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateOfficeFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOfficeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
