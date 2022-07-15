import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateIncidentFormComponent } from './update-incident-form.component';

describe('UpdateIncidentFormComponent', () => {
  let component: UpdateIncidentFormComponent;
  let fixture: ComponentFixture<UpdateIncidentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateIncidentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateIncidentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
