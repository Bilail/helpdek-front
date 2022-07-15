import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIncidentFormComponent } from './add-incident-form.component';

describe('AddIncidentFormComponent', () => {
  let component: AddIncidentFormComponent;
  let fixture: ComponentFixture<AddIncidentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddIncidentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIncidentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
