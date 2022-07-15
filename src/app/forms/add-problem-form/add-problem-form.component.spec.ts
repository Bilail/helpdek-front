import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProblemFormComponent } from './add-problem-form.component';

describe('AddProblemFormComponent', () => {
  let component: AddProblemFormComponent;
  let fixture: ComponentFixture<AddProblemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProblemFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProblemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
