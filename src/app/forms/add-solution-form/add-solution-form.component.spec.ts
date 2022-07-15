import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSolutionFormComponent } from './add-solution-form.component';

describe('AddSolutionFormComponent', () => {
  let component: AddSolutionFormComponent;
  let fixture: ComponentFixture<AddSolutionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSolutionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSolutionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
